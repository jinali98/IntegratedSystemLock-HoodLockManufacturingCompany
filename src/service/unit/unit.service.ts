import { Request, Response, NextFunction } from "express";
import { AdminUserType, JobType } from "../../../types";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, JobStatus, ResponseStatus } from "../../../enums/enums";

import { Unit } from "../../model/unit/unit";
const logger = LoggerGlobal.getInstance().logger;

export class UnitServices {
  async getAllUnits(req: Request, res: Response, next: NextFunction) {
    try {
      const units = await Unit.find();
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: units,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
