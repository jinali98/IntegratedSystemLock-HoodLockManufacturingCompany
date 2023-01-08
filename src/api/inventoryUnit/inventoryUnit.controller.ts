import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { UserInputValidators } from "../../interceptors/validator.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { AuthorizeUsersService } from "../../service/authorizeUser/authorizeUser.service";
import { InventoryUnitServices } from "../../service/inventoryUnit/inventoryUnit.service";
const inventoryUnitRouter = Router();
const inventoryUnitServices = new InventoryUnitServices();
const sanitize = new SanitizeInputs();
const validate = new UserInputValidators();
const tokenService = new TokenServices();
const authUser = new AuthorizeUsersService();

inventoryUnitRouter.post(
  "/:unitid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminWHU,
  sanitize.sanitizeUserInputs,
  validate.createInventoryUnitValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    inventoryUnitServices.createInventoryUnitForUnits(req, res, next);
  }
);
// update lw level qty
inventoryUnitRouter.patch(
  "/:unitid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminWHU,
  sanitize.sanitizeUserInputs,
  validate.updateInventoryUnitValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    inventoryUnitServices.updateInventoryUnitForUnits(req, res, next);
  }
);
inventoryUnitRouter.get(
  "/",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminWHU,
  async (req: Request, res: Response, next: NextFunction) => {
    inventoryUnitServices.getAllInventoryUnits(req, res, next);
  }
);
inventoryUnitRouter.get(
  "/:unitid",
  tokenService.verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    inventoryUnitServices.getAllInventoryUnitsByUnitid(req, res, next);
  }
);

export default inventoryUnitRouter;
