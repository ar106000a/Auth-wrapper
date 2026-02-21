import FormatError from "../utils/FormatError.js";
import AppError from "../utils/appError.js";
export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res
      .status(err.error_status_code)
      .json(FormatError(err.error_code, err.error_message, err.error_details));
  }
  console.log(err.stack);
  return res
    .status(500)
    .json(FormatError("SERVER_ERROR", "Internal server error!"));
};
