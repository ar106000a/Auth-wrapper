import { supabase } from "../../db/client.js";
import { generateOTP } from "../../utils/otpGeneration.js";
import AppError from "../../utils/appError.js";
import { sendEmail } from "../../utils/mailer.js";

export const sendOTPForResettingPasswordController = async (req, res, next) => {
  try {
    const { email, purpose } = req.body;

    // Validation
    if (!email) {
      throw new AppError("VALIDATION_ERROR", 400, "Email is missing!");
    }

    // Check for existing user
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id,is_verified,email")
      .eq("email", email)
      .single();

    if (existingUserError) {
      throw new AppError(
        "DATABASE_ERROR",
        500,
        "Account lookup failed from db",
      );
    }
    if (!existingUser) {
      throw new AppError(
        "VALIDATION_ERROR",
        401,
        "The email isn't linked to any account",
      );
    }
    if (!existingUser.is_verified) {
      throw new AppError(
        "VALIDATION_ERROR",
        403,
        "This account is unverified! Please register again!",
      );
    }

    // Generate OTP
    const otp = generateOTP();

    // Inside your function...
    try {
      await sendEmail({
        to: email,
        subject: "Your OTP",
        html: `<b>Your otp code is ${otp}</b>`,
      });
      console.log("Email sent via API!");
    } catch (error) {
      console.error("Mail API Error:", error);
      throw new AppError(
        "DATABASE_ERROR",
        500,
        "couldnt send otp to mail",
        error,
      );
    }

    // Feeding OTP to the database
    const { data, error } = await supabase
      .from("otps")
      .insert([{ user_id: existingUser.id, otp_code: otp, purpose: purpose }])
      .select()
      .single();

    if (error) {
      throw new AppError(
        "DATABASE_ERROR",
        500,
        "Failed storing the OTP in the db",
      );
    }

    if (data) {
      return res.status(200).json({
        message: "OTP sent to email, kindly confirm it...",
        success: true,
      });
    }
  } catch (error) {
    // console.error("Send OTP error:", error);
    // Check if the error is an instance of AppError
    if (error instanceof AppError) {
      return next(error); // Pass the AppError directly to the error handler
    }
    // For unexpected errors, create a new AppError with a generic message
    return next(
      new AppError("SERVER_ERROR", 500, "Internal Server error", error),
    );
  }
};
