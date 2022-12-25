import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}
export type Error = {
  statusCode: number;
  status: string;
  message: string;
};

export type AdminUserType = {
  _id?: object;
  email: string;
  password: string;
  dept: string;
};

export interface GlobalErroHandlerInterface {
  (err: any, req: Request, res: Response, next: NextFunction): void;
}
export interface TokenServicesInterface {
  verifyUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<NextFunction | void>;
  refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<NextFunction | void>;
  signRefreshToken(
    user: AdminUserType | any,
    next: NextFunction
  ): Promise<NextFunction | any>;
  signToken(
    user: AdminUserType | any,
    next: NextFunction
  ): Promise<NextFunction | any>;
}
