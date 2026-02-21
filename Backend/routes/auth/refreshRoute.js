import { Router } from "express";
import { refreshController } from "../../controllers/auth/refreshController.js";
import { createLimiter } from "../../utils/ratelimiter.js";
const refreshRoute = Router();
const refreshLimiter = createLimiter(60 * 60 * 1000, 20);

refreshRoute.post("/refresh", refreshLimiter, refreshController);
export default refreshRoute;
