import { Request, Response, NextFunction } from 'express';
import { InventoryType } from '../../../types';
import LoggerGlobal from '../../../logger/loggerSingelton';
import errorResponseHandler from '../../../utils/errorResponseHandler';
import { ErrorMessages, ResponseStatus } from '../../../enums/enums';
import { customAlphabet } from 'nanoid';
import { Invenotry } from '../../model/inventory/inventory';
const nanoid = customAlphabet('1234567890abcdef', 5);
const logger = LoggerGlobal.getInstance().logger;

export class InventoryServices {
  private inventory = {} as InventoryType;

  async createInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const { materialName } = req.body;

      const material: InventoryType = await Invenotry.create({
        materialid: nanoid(),
        materialName,
      });

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: material,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async getAllInventories(req: Request, res: Response, next: NextFunction) {
    try {
      const materials: InventoryType[] = await Invenotry.find();

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: materials,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async updateInvenotry(req: Request, res: Response, next: NextFunction) {
    const { materialid } = req.params;
    const { materialName } = req.body;
    try {
      await Invenotry.findOneAndUpdate(
        { materialid },
        { materialName: materialName }
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

  //Kavindra reportOfAllMaterials
  async reportOfAllMaterials(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await Invenotry.find();

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
