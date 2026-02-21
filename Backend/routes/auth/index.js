import { Router } from "express";
import loginRoute from "./loginRoute.js";
import registerRoute from "./registerRoute.js";
import confirmEmailRoute from "./confirmEmailRoute.js";
import usernameCheckingRoute from "./usernameCheckingRoute.js";
import sendOTPForResettingPasswordRoute from "./sendOTPForResettingPasswordRoute.js";
import confirmOTPForResettingPasswordRoute from "./confirmOTPForResettingPasswordRoute.js";
import resetPasswordRoute from "./resetPasswordRoute.js";
import refreshRoute from "./refreshRoute.js";
import logoutRoute from "./logoutRoute.js";
import { errorHandler } from "../../middleware/errorHandler.js";

const authRoutes = Router();

authRoutes.use("/", loginRoute);
authRoutes.use("/", registerRoute);
authRoutes.use("/", confirmEmailRoute);
authRoutes.use("/", usernameCheckingRoute);
authRoutes.use("/", sendOTPForResettingPasswordRoute);
authRoutes.use("/", confirmOTPForResettingPasswordRoute);
authRoutes.use("/", resetPasswordRoute);
authRoutes.use("/", refreshRoute);
authRoutes.use("/", logoutRoute);
authRoutes.use(errorHandler);
export default authRoutes;
