import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokens = req.cookies.myToken;
    if (!tokens) {
      return res.json({
        success: false,
        error: true,
        message: "token not found.........",
      });
    }

    const decode = jwt.verify(
      tokens,
      process.env.SECRET_KEY as string
    ) as jwt.JwtPayload;
    if (!decode) {
      return res.json({
        success: false,
        error: true,
        message: "Invalid Token",
      });
    }
    req.id = decode?.userId;
    next();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server error",
    });
  }
};
