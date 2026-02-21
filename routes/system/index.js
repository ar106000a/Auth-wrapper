import { Router } from "express";
import { errorHandler } from "../../middleware/errorHandler.js";
import healthRouter from "../system/healthRoute.js";
const systemRoutes = Router();
systemRoutes.use("/", healthRouter);
systemRoutes.use(errorHandler);
export default systemRoutes;
