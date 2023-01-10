import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { UserInputValidators } from "../../interceptors/validator.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { AuthorizeUsersService } from "../../service/authorizeUser/authorizeUser.service";
import { ProductServices } from "../../service/product/product.service";
const productRouter = Router();
const productServices = new ProductServices();
const sanitize = new SanitizeInputs();
const validate = new UserInputValidators();
const tokenService = new TokenServices();
const authUser = new AuthorizeUsersService();

productRouter.get(
  "/",
  tokenService.verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    productServices.getAllProducts(req, res, next);
  }
);
productRouter.post(
  "/",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminSMD,
  sanitize.sanitizeUserInputs,
  validate.createProductValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    productServices.createProduct(req, res, next);
  }
);
productRouter.patch(
  "/:productid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminSMD,
  sanitize.sanitizeUserInputs,
  validate.createProductValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    productServices.updateProducts(req, res, next);
  }
);

// hashan - report of products
productRouter.get(
  "/report/products-list",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHM,
  async (req: Request, res: Response, next: NextFunction) => {
    productServices.reportOfProducts(req, res, next);
  }
);

export default productRouter;
