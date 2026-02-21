import { Router } from "express";
import { resetPasswordController } from "../../controllers/auth/resettingPasswordController.js";
import { createLimiter } from "../../utils/ratelimiter.js";
const resetPasswordRoute = Router();
const resetPasswordLimiter = createLimiter(60 * 60 * 1000, 4);
resetPasswordRoute.post(
  "/password/reset",
  resetPasswordLimiter,
  resetPasswordController,
);
export default resetPasswordRoute;
