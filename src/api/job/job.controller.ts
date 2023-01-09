import { Request, Response, NextFunction, Router } from 'express';
import { SanitizeInputs } from '../../interceptors/sanitize.interceptor';
import { UserInputValidators } from '../../interceptors/validator.interceptor';
import { TokenServices } from '../../service/token/token.service';
import { AuthorizeUsersService } from '../../service/authorizeUser/authorizeUser.service';
import { JobServices } from '../../service/job/job.service';
const jobRouter = Router();
const jobServices = new JobServices();
const sanitize = new SanitizeInputs();
const validate = new UserInputValidators();
const tokenService = new TokenServices();
const authUser = new AuthorizeUsersService();

jobRouter.get(
  '/:unitid',
  tokenService.verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    jobServices.getKanbanJobsByUnit(req, res, next);
  }
);
jobRouter.post(
  '/',
  tokenService.verifyUser,
  authUser.checkUserRoleAdminED,
  sanitize.sanitizeUserInputs,
  validate.createJobValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    jobServices.createAKanbanJob(req, res, next);
  }
);
jobRouter.post(
  '/assign',
  tokenService.verifyUser,
  sanitize.sanitizeUserInputs,
  validate.assignJobValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    jobServices.assignAKanbanJobToEmployee(req, res, next);
  }
);
jobRouter.post(
  '/update',
  tokenService.verifyUser,
  sanitize.sanitizeUserInputs,
  validate.updateJobValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    jobServices.updateKanbanJobStatus(req, res, next);
  }
);

// kavindra - completed tasks report for by a unit for a given period of time
jobRouter.post(
  '/report/completed-tasks/:unitid',
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHM,
  sanitize.sanitizeUserInputs,
  validate.dateRangeValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    jobServices.reportOfCompletedJObsByUnitWithinAtime(req, res, next);
  }
);

jobRouter.get(
  '/complete/:jobid',
  tokenService.verifyUser,
  sanitize.sanitizeUserInputs,
  async (req: Request, res: Response, next: NextFunction) => {
    jobServices.completeKanbanJobStatus(req, res, next);
  }
);

export default jobRouter;

// hasna - Tasks completed by emp within a given period
jobRouter.post(
  "/report/emp-completed/:empid",
  tokenService.verifyUser,
  authUser.checkUserRoleAdminHM,
  sanitize.sanitizeUserInputs,
  validate.dateRangeValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    jobServices.completeJobsByEmpWithinSelectedTime(req, res, next);
  }
);