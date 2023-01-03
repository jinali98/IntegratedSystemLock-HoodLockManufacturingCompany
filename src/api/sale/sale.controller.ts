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

export default salesRouter;
