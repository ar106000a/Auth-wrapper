import { Router } from "express";
import getProfileRoute from "./getProfileRoute.js";
const protectedRoutes = Router();

protectedRoutes.use("/", getProfileRoute);
export default protectedRoutes;
