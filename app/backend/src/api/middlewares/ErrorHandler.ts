import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

export default class ErrorHandler {
  public static handle(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ message: err.message });
    }
    if (err instanceof Error && err.stack) {
      return res.status(parseInt(err.stack, 10)).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}
