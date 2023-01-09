import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { UserInputValidators } from "../../interceptors/validator.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { AuthorizeUsersService } from "../../service/authorizeUser/authorizeUser.service";
import { EmployeeServices } from "../../service/employee/employee.service";
const employeeRouter = Router();
const employeeServices = new EmployeeServices();
const sanitize = new SanitizeInputs();
const validate = new UserInputValidators();
const tokenService = new TokenServices();
const authUser = new AuthorizeUsersService();

employeeRouter.post(
  "/",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHRD,
  sanitize.sanitizeUserInputs,
  validate.createEmployeeValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    employeeServices.createEmployee(req, res, next);
  }
);
employeeRouter.get(
  "/",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHRD,
  async (req: Request, res: Response, next: NextFunction) => {
    employeeServices.getAllEmployee(req, res, next);
  }
);
employeeRouter.get(
  "/:unitid",
  tokenService.verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    employeeServices.getEmployeeByUnitid(req, res, next);
  }
);
employeeRouter.get(
  "/single-emp/:empid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHRD,
  async (req: Request, res: Response, next: NextFunction) => {
    employeeServices.getEmployeeById(req, res, next);
  }
);

export default employeeRouter;
