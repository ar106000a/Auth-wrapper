import { supabase } from "../../db/client.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  generateEmailToken,
} from "../../utils/tokensGenerationForAuth.js";
import AppError from "../../utils/appError.js"; // Import AppError
import { generateOTP } from "../../utils/otpGeneration.js";
import { transporter } from "../../utils/transporter.js";

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // console.time("Validation start");
    // Validation
    if (!email || !password) {
      throw new AppError(
        "VALIDATION_ERROR",
        400,
        "Email and password are mandatory",
      );
    }
    // console.timeEnd("Validation start");


    // console.time("db lookup");
    // Get user from database
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();
    // console.timeEnd("db lookup");

    if (error) {
      throw new AppError("DATABASE_ERROR", 500, "Failed db lookup", error);
    }
    if (!user) {
      throw new AppError("INVALID_CREDENTIALS", 401, "Invalid credentials");
    }
    // console.log("--- DEBUG AUTH ---");
    // console.log("Input Password:", password);
    // console.log("Stored Hash:  ", user.password_hash);
    // console.log(await bcrypt.hash(password, 12));
    // console.log("Hash Length:  ", user.password_hash.length);
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new AppError("INVALID_CREDENTIALS", 401, "Invalid credentials");
    }

    if (user.is_verified) {
      // Generate tokens
      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      // Set refresh token in HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Redirecting to Dashboard
      return res.status(200).json({
        user: { id: user.id, email: user.email, username: user.username },
        accessToken: accessToken,
        success: true,
      });
    } else {
      // Generate OTP
      const otp = generateOTP();
      const mailOptions = {
        from: "chromaticartison@gmail.com",
        to: email,
        subject: "Confirm your OTP at signup",
        text: `Your OTP is ${otp}`,
      };

      // Sending OTP to mail
      try {
        const info = await transporter.sendMail(mailOptions);
        // console.log("Email sent: ", info);
      } catch (mailError) {
        // console.error("Error sending email:", mailError);
        throw new AppError(
          "SERVER_ERROR",
          500,
          "Error sending mail to recipient",
          mailError,
        );
      }
      //inserting otp in the otps table
      const { error: otpError } = await supabase
        .from("otps")
        .insert([{ user_id: user.id, otp_code: otp }])
        .select()
        .single();

      if (otpError) {
        throw new AppError(
          "SERVER_ERROR",
          500,
          "Error while inserting OTP code",
          otpError,
        );
      }

      const confirmEmailToken = generateEmailToken(user.email);
      res.cookie("confirmEmailToken", confirmEmailToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 10 * 60 * 1000,
      });

      // Redirecting to Confirm email endpoint
      return res.status(200).json({
        user: { id: user.id, email: user.email, username: user.username },
        accessToken: null,
        success: true,
      });
    }
  } catch (error) {
    // console.error("Login error:", error);
    // Check if the error is an instance of AppError
    if (error instanceof AppError) {
      return next(error); // Pass the AppError directly to the error handler
    }
    // For unexpected errors, create a new AppError with a generic message
    return next(
      new AppError("SERVER_ERROR", 500, "Internal Server Error", error),
    );
  }
};
