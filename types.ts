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
  deptid: string;
};
export type JobType = {
  _id?: object;
  jobid: string;
  unitid: string;
  email: string;
  password: string;
  dept: string;
  expected_start_date: string;
  expected_end_date: string;
  allocated_hours: string;
  actual_start_date: string;
  actual_finish_date: string;
  status: string;
  description: string;
  assigned_emp_id: string;
  created_date: string;
};
export type SaleType = {
  _id?: object;
  saleid: string;
  productid: string;
  totalSoldQty: number;
  pricePerUnit: number;
  periodStartDate: string;
  periodEndDate: string;
};
export type ProductType = {
  _id?: object;
  productid: string;
  productName: string;
  productDescription: string;
};
export type InventoryType = {
  _id?: object;
  materialid: string;
  materialName: string;
};

export type EmployeeType = {
  _id?: object;
  unitid: string;
  email: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  empid: string;
  designation: string;
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
export interface AuthorizeUserServicesInterface {
  checkUserRoleAdminED(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<NextFunction | void>;
}
