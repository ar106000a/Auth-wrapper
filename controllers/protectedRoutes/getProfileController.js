import { supabase } from "../../db/client.js";
import AppError from "../../utils/appError.js";

export const getProfileController = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", req.user.userId)
      .single();

    if (error) {
      throw new AppError(
        "DATABASE_ERROR",
        500,
        "Couldnt get the user data from DB",
      );
    }
    if (!user) {
      throw new AppError("VALIDATION_ERROR", 401, "User not found");
    }

    return res.status(200).json({ user });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    const err = new AppError(
      "INTERNAL_SERVER_ERROR",
      500,
      "An error occured in server!",
    );
    return next(err);
  }
};
