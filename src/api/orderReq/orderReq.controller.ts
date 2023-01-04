import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { UserInputValidators } from "../../interceptors/validator.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { AuthorizeUsersService } from "../../service/authorizeUser/authorizeUser.service";
import { OrderRequestsServices } from "../../service/orderReq/orderReq.service";
const orderRequestsRouter = Router();
const orderRequestsServices = new OrderRequestsServices();
const sanitize = new SanitizeInputs();
const validate = new UserInputValidators();
const tokenService = new TokenServices();
const authUser = new AuthorizeUsersService();

// orderRequestsRouter.post(
//   "/",
//   async (req: Request, res: Response, next: NextFunction) => {
//     orderRequestsServices.createOrderRequest(req.body);
//   }
// );
orderRequestsRouter.get(
  "/warehouse-unit/:type",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminWHU,
  async (req: Request, res: Response, next: NextFunction) => {
    orderRequestsServices.wareHouseUnitViewOrderReq(req, res, next);
  }
);
orderRequestsRouter.get(
  "/warehouse/completed",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminWHU,
  async (req: Request, res: Response, next: NextFunction) => {
    orderRequestsServices.wareHouseUnitViewCompletedOrderReq(req, res, next);
  }
);
orderRequestsRouter.get(
  "/purchasing-dept/:isCompleted",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminPD,
  async (req: Request, res: Response, next: NextFunction) => {
    orderRequestsServices.purchasingDeptViewOrderReq(req, res, next);
  }
);
orderRequestsRouter.patch(
  "/process-whu/:reqid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminWHU,
  sanitize.sanitizeUserInputs,
  validate.whProcessOrderValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    orderRequestsServices.wareHouseProcessOrderRequests(req, res, next);
  }
);
orderRequestsRouter.get(
  "/process-pd/:reqid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminPD,
  async (req: Request, res: Response, next: NextFunction) => {
    orderRequestsServices.purchasingDeptProcessOrderRequests(req, res, next);
  }
);
orderRequestsRouter.patch(
  "/update/:reqid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminPD,
  sanitize.sanitizeUserInputs,
  validate.pdUpdateOrderValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    orderRequestsServices.purchasingDeptUpdateOrderRequests(req, res, next);
  }
);
orderRequestsRouter.get(
  "/complete/:reqid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminPD,
  async (req: Request, res: Response, next: NextFunction) => {
    orderRequestsServices.purchasingDeptCompleteOrderRequests(req, res, next);
  }
);

export default orderRequestsRouter;
