import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { UserInputValidators } from "../../interceptors/validator.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { AuthorizeUsersService } from "../../service/authorizeUser/authorizeUser.service";
import { ProductServices } from "../../service/product/product.service";
import { SaleServices } from "../../service/sale/sale.service";
const salesRouter = Router();
const saleServices = new SaleServices();
const sanitize = new SanitizeInputs();
const validate = new UserInputValidators();
const tokenService = new TokenServices();
const authUser = new AuthorizeUsersService();

salesRouter.get(
  "/",
  tokenService.verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    saleServices.getAllSalesRecords(req, res, next);
  }
);
salesRouter.get(
  "/:saleid",
  tokenService.verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    saleServices.getSaleById(req, res, next);
  }
);
salesRouter.post(
  "/",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminSMD,
  sanitize.sanitizeUserInputs,
  validate.createSaleValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    saleServices.createSaleRecord(req, res, next);
  }
);

salesRouter.post(
  "/report/sales-for-period",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHM,
  sanitize.sanitizeUserInputs,
  validate.dateRangeValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    saleServices.getSalesForPeriod(req, res, next);
  }
);

// adithya report - sales record for a selected period of time for a certain product
salesRouter.post(
  "/report/sales-for-period/:productid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHM,
  sanitize.sanitizeUserInputs,
  validate.dateRangeValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    saleServices.getSalesByProductForPeriod(req, res, next);
  }
);

// adithya report -monthly sales record for a certain product
salesRouter.post(
  "/report/monthly/:productid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHM,
  sanitize.sanitizeUserInputs,
  validate.dateRangeMonthlyValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    saleServices.getMonthlySalesByProduct(req, res, next);
  }
);

// kavindra -yearly sales record for a certain product
salesRouter.post(
  "/report/yearly/:productid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHM,
  sanitize.sanitizeUserInputs,
  validate.dateRangeYearlyValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    saleServices.getYearlySalesByProduct(req, res, next);
  }
);

// hasna  -monthly sales record
salesRouter.post(
  "/report/sales-monthly",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHM,
  sanitize.sanitizeUserInputs,
  validate.dateRangeMonthlyValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    saleServices.viewMonthlySales(req, res, next);
  }
);

// hasna  - yearly sales record
salesRouter.post(
  "/report/sales-yearly",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHM,
  sanitize.sanitizeUserInputs,
  validate.dateRangeYearlyValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    saleServices.viewYearlySales(req, res, next);
  }
);

// income report
salesRouter.post(
  "/report/income",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHM,
  sanitize.sanitizeUserInputs,
  validate.dateRangeMonthlyValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    saleServices.incomeReport(req, res, next);
  }
);

export default salesRouter;
