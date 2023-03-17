import { Request, Response } from "express";
import httpStatus from "http-status";

import { IAuthService } from "../types/interfaces/IAuthService";
import { IUser } from "../types/interfaces/IUser";

export default class AuthController {
  constructor(private _service: IAuthService<IUser, any>) {}

  async register(req: Request, res: Response<IUser>) {
    const result = await this._service.register(req.body);
    return res.status(httpStatus.CREATED).json(result);
  }

  async login(req: Request, res: Response<IUser>) {
    const result = await this._service.login(req.body);
    return res.status(httpStatus.OK).json(result);
  }
}
