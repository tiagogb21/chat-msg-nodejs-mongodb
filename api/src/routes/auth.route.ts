import { Router } from "express";

import userControllerService from "../factories/auth.factory";
import Validation from "../middlewares/Validation";
import { userZodSchema } from "../types/interfaces/IUser";

const authRouter = Router();

const validation = new Validation(userZodSchema);

authRouter.post("/", (req, res) =>
  validation.verifyBody(req, res, () =>
    userControllerService.register(req, res)
  )
);

authRouter.get("/", validation.verifyBody, (req, res) =>
  userControllerService.login(req, res)
);

export default authRouter;
