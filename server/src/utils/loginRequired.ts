import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const loginRequired = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.json({ message: "Token is required" }).status(401);
  }

  jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN || "", (err, user) => {
    if (err) {
      return res.json({ message: "Invalid token" }).status(401);
    }

    req.user = user;
    next();
  });
};
