import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { UserInputValidators } from "../../interceptors/validator.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { AuthorizeUsersService } from "../../service/authorizeUser/authorizeUser.service";
import { UnitServices } from "../../service/unit/unit.service";
const unitRouter = Router();
const sanitize = new SanitizeInputs();
const validate = new UserInputValidators();
const tokenService = new TokenServices();
const unitServices = new UnitServices();
const authUser = new AuthorizeUsersService();

unitRouter.get(
  "/",
  tokenService.verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    unitServices.getAllUnits(req, res, next);
  }
);

export default unitRouter;
