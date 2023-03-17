import { Router } from "express";
import routerCar from "./auth.route";

const route = Router();

route.use("/auth", routerCar);

export default route;
