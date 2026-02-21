import { Router } from "express";
import { loginController } from "../../controllers/auth/loginController.js";
import { createLimiter } from "../../utils/ratelimiter.js";
const loginRoute = Router();
const loginLimiter = createLimiter(10 * 60 * 1000, 5);

loginRoute.post("/login",  loginController);
export default loginRoute;
