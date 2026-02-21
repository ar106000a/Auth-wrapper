const FormatError = (error_code, error_message, error_details = null) => {
  return {
    error: error_message,
    error_info: { error_code, error_message, error_details },
    success: false,
  };
};
export default FormatError;
