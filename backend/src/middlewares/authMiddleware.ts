import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer ", "").trim();
  try {
    const data = jwt.verify(token, process.env.APP_SECRET as string) as {
      id: string;
      iat: number;
      exp: number;
    };

    if (Date.now() >= data.exp * 1000) {
      return res.sendStatus(401);
    }

    req.body.user = data.id;
    return next();
  } catch {
    return res.sendStatus(401);
  }
}
