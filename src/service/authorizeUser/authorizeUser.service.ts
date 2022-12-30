import { Request, Response, NextFunction } from "express";
import { Departments, ErrorMessages } from "../../../enums/enums";
import { AuthorizeUserServicesInterface } from "../../../types";
import errorResponseHandler from "../../../utils/errorResponseHandler";

export class AuthorizeUsersService implements AuthorizeUserServicesInterface {
  async checkUserRoleAdminED(req: Request, res: Response, next: NextFunction) {
    if (req.user.dept !== Departments.ED) {
      return next(errorResponseHandler(403, ErrorMessages.UNAUTHORIZED_USER));
    }
    next();
  }
  async checkUserRoleAdminHRD(req: Request, res: Response, next: NextFunction) {
    if (req.user.dept !== Departments.HRD) {
      return next(errorResponseHandler(403, ErrorMessages.UNAUTHORIZED_USER));
    }
    next();
  }
  async checkUserRoleAdminRDD(req: Request, res: Response, next: NextFunction) {
    if (req.user.dept !== Departments.RDD) {
      return next(errorResponseHandler(403, ErrorMessages.UNAUTHORIZED_USER));
    }
    next();
  }
  async checkUserRoleAdminSMD(req: Request, res: Response, next: NextFunction) {
    if (req.user.dept !== Departments.SMD) {
      return next(errorResponseHandler(403, ErrorMessages.UNAUTHORIZED_USER));
    }
    next();
  }
  async checkUserRoleAdminPD(req: Request, res: Response, next: NextFunction) {
    if (req.user.dept !== Departments.PD) {
      return next(errorResponseHandler(403, ErrorMessages.UNAUTHORIZED_USER));
    }
    next();
  }
}
