import { Router } from "express";
import { confirmEmailController } from "../../controllers/auth/confirmEmailController.js";
const confirmEmailRoute = Router();

confirmEmailRoute.post("/confirm_email", confirmEmailController);
export default confirmEmailRoute;
