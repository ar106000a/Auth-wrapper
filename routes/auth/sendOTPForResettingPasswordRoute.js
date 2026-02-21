import { Router } from "express";
import { sendOTPForResettingPasswordController } from "../../controllers/auth/sendOTPForResettingPasswordController.js";
import { createLimiter } from "../../utils/ratelimiter.js";
const sendOTPForResettingPasswordRoute = Router();

const passwordOTPLimiter = createLimiter(10 * 60 * 1000, 3);
sendOTPForResettingPasswordRoute.post(
  "/password/otp",
  passwordOTPLimiter,
  sendOTPForResettingPasswordController,
);
export default sendOTPForResettingPasswordRoute;
