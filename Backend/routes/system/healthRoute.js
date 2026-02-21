import { Router } from "express";
import { healthCheck } from "../../controllers/system/healthController.js";
const healthRouter = Router();

healthRouter.post("/health", healthCheck);
export default healthRouter;
