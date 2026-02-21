import { Router } from "express";
import { logoutController } from "../../controllers/auth/logoutController.js";
import { authenticateToken } from "../../middleware/authMiddleware.js";
const logoutRoute = Router();
// logoutRoute.use(authenticateToken);
logoutRoute.post("/logout", logoutController);
export default logoutRoute;
