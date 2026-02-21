import { Router } from "express";
import { confirmOTPForResettingPasswordController } from "../../controllers/auth/confirmOTPForResettingPasswordController.js";
import { createLimiter } from "../../utils/ratelimiter.js";
const confirmOTPForResettingPasswordRoute = Router();
const confirmEmailLimiter = createLimiter(60 * 60 * 1000, 10);

confirmOTPForResettingPasswordRoute.post(
  "/password/verify",
  confirmEmailLimiter,
  confirmOTPForResettingPasswordController,
);
export default confirmOTPForResettingPasswordRoute;
