import { Request, Response, NextFunction } from "express";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus } from "../../../enums/enums";
import { InvenotryUnit } from "../../model/inventoryUnit/inventoryUnit";
import {
  materialNameById,
  materialNameByIdByUnit,
} from "../../aggregators/materialNameById";
import { materials } from "../../aggregators/aggregators";
const logger = LoggerGlobal.getInstance().logger;

export class InventoryUnitServices {
  async createInventoryUnitForUnits(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const unit = req.params.unitid;
    const { materialid, availableQty, lowLevelQty } = req.body;

    const Iunit = await InvenotryUnit.create({
      unitid: unit,
      materialid,
      availableQty,
      lowLevelQty,
    });

    try {
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: Iunit,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async updateInventoryUnitForUnits(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const unit = req.params.unitid;
    const { lowLevelQty, materialid } = req.body;

    const Iunit = await InvenotryUnit.findOneAndUpdate(
      {
        unitid: unit,
        materialid,
      },
      { lowLevelQty }
    );

    try {
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

  async getAllInventoryUnits(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await materialNameById();

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async getAllInventoryUnitsByUnitid(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const unit = req.params.unitid;
    try {
      const data = await materialNameByIdByUnit(unit);

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async viewAvailableMaterialsEachUnit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const list = await materials();

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: list,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
