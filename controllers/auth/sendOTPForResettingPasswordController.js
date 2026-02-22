import { supabase } from "../../db/client.js";
import { generateOTP } from "../../utils/otpGeneration.js";
import { transporter } from "../../utils/transporter.js";
import AppError from "../../utils/appError.js";

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
    const mailOptions = {
      from: `"My Cool App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirm your OTP for password reset",
      text: `Your OTP is ${otp}`,
    };

    // Sending OTP email
    try {
      const info = await transporter.sendMail(mailOptions);
      // console.log("Email sent:", info.response);
    } catch (emailError) {
      // console.error("Error sending email:", emailError);
      throw new AppError(
        "SERVER_ERROR",
        500,
        "We encountered an error while sending the OTP. Please try again!",
        emailError,
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
