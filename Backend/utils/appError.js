class AppError extends Error {
  constructor(error_code, error_status_code, error_message, error_details) {
    super(error_message);
    this.error_message=error_message
    this.error_code = error_code;
    this.error_details = error_details;
    this.error_status_code = error_status_code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
