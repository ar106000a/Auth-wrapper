import { Router } from "express";
import { registerController } from "../../controllers/auth/registerController.js";
import { createLimiter } from "../../utils/ratelimiter.js";
const registerRoute = Router();

const registerLimiter = createLimiter(6 * 60 * 1000, 5);
registerRoute.post("/register", registerController);
export default registerRoute;
