import { Router } from "express";
import { usernameCheckingController } from "../../controllers/auth/usernameCheckingController.js";
const usernameCheckingRoute = Router();

usernameCheckingRoute.post("/username", usernameCheckingController);
export default usernameCheckingRoute;
