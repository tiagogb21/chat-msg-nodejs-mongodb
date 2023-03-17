import jwt from "jsonwebtoken";
import { IUser } from "../types/interfaces/IUser";
import crypto from "crypto";

export default class JwtService {
  private readonly _secretKey: string;

  constructor() {
    this._secretKey = crypto.randomBytes(32).toString("hex");
  }

  sign(user: IUser): string {
    const expiresInMs = +process.env.JWT_AUTH_EXPIRES;

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      this._secretKey,
      {
        expiresIn: Math.floor(Date.now() / 1000) + expiresInMs,
      }
    );

    return token;
  }

  verify(token: string): IUser {
    const decoded = jwt.verify(token, this._secretKey) as IUser;
    return decoded;
  }
}
