import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import httpStatus from "http-status";
import { ZodError, ZodObject } from "zod";

export default class Validation {
  private readonly schema: ZodObject<any>;

  constructor(schema?: ZodObject<any>) {
    this.schema = schema;
  }

  verifyResult(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  }

  verifyBody(req: Request, res: Response, next: NextFunction): void {
    const parsedValue = this.schema.safeParse(req.body);

    if (parsedValue.success === false) {
      const error = parsedValue.error as ZodError;
      return next(error);
    }

    next();
  }
}
