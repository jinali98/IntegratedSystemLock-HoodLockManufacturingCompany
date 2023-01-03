import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { UserInputValidators } from "../../interceptors/validator.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { AuthorizeUsersService } from "../../service/authorizeUser/authorizeUser.service";
import { InventoryServices } from "../../service/inventory/inventory.service";
const inventoryRouter = Router();
const inventoryServices = new InventoryServices();
const sanitize = new SanitizeInputs();
const validate = new UserInputValidators();
const tokenService = new TokenServices();
const authUser = new AuthorizeUsersService();

inventoryRouter.get(
  "/",
  tokenService.verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    inventoryServices.getAllInventories(req, res, next);
  }
);
inventoryRouter.post(
  "/",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminWHU,
  sanitize.sanitizeUserInputs,
  validate.createInvenotryValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    inventoryServices.createInventory(req, res, next);
  }
);
inventoryRouter.patch(
  "/:materialid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminWHU,
  sanitize.sanitizeUserInputs,
  validate.updateInventoryValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    inventoryServices.updateInvenotry(req, res, next);
  }
);

export default inventoryRouter;
