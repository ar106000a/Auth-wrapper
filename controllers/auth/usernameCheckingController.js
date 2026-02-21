import AppError from "../../utils/appError.js";
import { supabase } from "../../db/client.js";

export const usernameCheckingController = async (req, res, next) => {
  try {
    const { email, username } = req.body;

    // Validation
    if (!username) {
      throw new AppError("VALIDATION_ERROR", 400, "Username is required");
    }

    const { data: existingUsername, error } = await supabase
      .from("users")
      .select("id,is_verified,email")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      throw new AppError(
        "DATABASE_ERROR",
        500,
        "Failed checking username",
        error,
      );
    }

    if (!existingUsername) {
      return res.status(200).json({
        isAvailable: true,
        success: true,
        message: "Username is available!",
      });
    } else {
      if (existingUsername.email === email) {
        if (existingUsername.is_verified) {
          return res.status(200).json({
            isAvailable: false,
            success: true,
            message: "Username is not available!",
          });
        } else {
          return res.status(200).json({
            isAvailable: true,
            success: true,
            message: "Username is available!",
          });
        }
      } else {
        return res.status(200).json({
          isAvailable: false,
          success: true,
          message: "Username is not available!",
        });
      }
    }
  } catch (error) {
    // console.error("Username checking error:", error);
    // Check if the error is an instance of AppError
    if (error instanceof AppError) {
      return next(error); // Pass the AppError directly to the error handler
    }
    // For unexpected errors, create a new AppError with a generic message
    return next(
      new AppError(
        "SERVER_ERROR",
        500,
        "Internal server error while checking for username availability!",
        error,
      ),
    );
  }
};
