import { Request, Response, NextFunction } from "express";
import { JobType } from "../../../types";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import {
  DepartmentsCode,
  ErrorMessages,
  JobStatus,
  ResponseStatus,
} from "../../../enums/enums";
import { customAlphabet } from "nanoid";
import { Job } from "../../model/job/job";
import { InvenotryUnit } from "../../model/inventoryUnit/inventoryUnit";
const nanoid = customAlphabet("1234567890abcdef", 5);
const logger = LoggerGlobal.getInstance().logger;

export class JobServices {
  private job = {} as JobType;

  async getKanbanJobsByUnit(req: Request, res: Response, next: NextFunction) {
    const currentUserDetails = req.user;
    const unit = req.params.unitid;

    if (
      currentUserDetails.deptid !== unit &&
      currentUserDetails.deptid !== DepartmentsCode.ED
    ) {
      return next(errorResponseHandler(403, ErrorMessages.UNAUTHORIZED_USER));
    }

    const jobs = await Job.find({ unitid: unit });

    try {
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: jobs,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async createAKanbanJob(req: Request, res: Response, next: NextFunction) {
    const { unitid, expectedStartDate, allocatedHours, description } = req.body;
    try {
      const expectedFinishDate =
        new Date(expectedStartDate).getTime() + allocatedHours * 60 * 60 * 1000;
      await Job.create({
        jobid: nanoid(),
        unitid,
        expectedStartDate: new Date(expectedStartDate),
        expectedFinishDate: new Date(expectedFinishDate),
        allocatedHours,
        description,
        status: JobStatus.BACKLOG,
      });

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async assignAKanbanJobToEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { jobid, empid, materials } = req.body;
    try {
      const job = await Job.findOneAndUpdate(
        { jobid },
        {
          empid,
          actualStartDate: new Date(),
          status: JobStatus.INPROGRESS,
          materials,
        }
      );

      for (const item of materials) {
        const items = await InvenotryUnit.findOne({
          materialid: item.materialid,
          unitid: job.unitid,
        });
        await InvenotryUnit.findOneAndUpdate(
          { materialid: item.materialid, unitid: job.unitid },
          {
            availableQty: items.availableQty - item.qty,
          }
        );
      }

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async updateKanbanJobStatus(req: Request, res: Response, next: NextFunction) {
    const { jobid, status } = req.body;
    try {
      await Job.findOneAndUpdate({ jobid }, { status });
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async completeKanbanJobStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const jobid = req.params.jobid;
    try {
      await Job.findOneAndUpdate(
        { jobid },
        { actualFinishDate: new Date(), status: JobStatus.DONE }
      );
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
