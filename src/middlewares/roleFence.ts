import { NextFunction, Request, Response } from "express";
import UserModel from "../auth/models/User";

export const roleFence = (role: string) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findById((req.user as any).id);
    console.log(user);
    if (!user?.roles.includes(role)) {
      return res.status(401).send("Unauthorized");
    }
    next();
  };
  return func;
};
