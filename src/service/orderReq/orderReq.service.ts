import { Request, Response, NextFunction } from "express";
import { OrderRequestType } from "../../../types";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import {
  ErrorMessages,
  ResponseStatus,
  orderReqStatus,
} from "../../../enums/enums";
import { customAlphabet } from "nanoid";
import { OrderReq } from "../../model/orderReq/orderReq";
import { InvenotryUnit } from "../../model/inventoryUnit/inventoryUnit";
const nanoid = customAlphabet("1234567890abcdef", 8);
const logger = LoggerGlobal.getInstance().logger;

export class OrderRequestsServices {
  private orderRequest = {} as OrderRequestType;

  async createOrderRequest(data) {
    try {
      const { materialid, availableQty, unitid } = data;
      await OrderReq.create({
        reqid: nanoid(),
        materialid,
        availableQty: +availableQty,
        unitid,
      });
    } catch (err) {
      logger.error(err.message);
    }
  }
  async wareHouseUnitViewOrderReq(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const orders =
      req.params.type === "true"
        ? await OrderReq.find({ sentToPurchase: true, isCompleted: false })
        : await OrderReq.find({ sentToPurchase: false });
    try {
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: orders,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async wareHouseUnitViewCompletedOrderReq(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const orders = await OrderReq.find({ isCompleted: true });
    try {
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: orders,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async purchasingDeptViewOrderReq(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const orders =
        req.params.isCompleted === "true"
          ? await OrderReq.find({ sentToPurchase: true, isCompleted: true })
          : await OrderReq.find({ sentToPurchase: true, isCompleted: false });
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: orders,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async wareHouseProcessOrderRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { requestedQty } = req.body;
    const { reqid } = req.params;
    try {
      await OrderReq.findOneAndUpdate(
        { reqid },
        {
          requestedQty: +requestedQty,
          sentToPurchase: true,
          requestedDate: new Date(),
          reqStatus: orderReqStatus.SENT,
        }
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
  async purchasingDeptProcessOrderRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { reqid } = req.params;
    try {
      await OrderReq.findOneAndUpdate(
        { reqid },
        {
          reqStatus: orderReqStatus.PROCESSING,
        }
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
  async purchasingDeptUpdateOrderRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { reqid } = req.params;
    const { pricePerUnit } = req.body;
    try {
      await OrderReq.findOneAndUpdate({ reqid }, { pricePerUnit });

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
  async purchasingDeptCompleteOrderRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { reqid } = req.params;
    try {
      const reqdata = await OrderReq.findOneAndUpdate(
        { reqid },
        {
          isCompleted: true,
          completedDate: new Date(),
          reqStatus: orderReqStatus.COMPLETED,
        }
      );

      const inventory: any = await InvenotryUnit.findOne({
        unitid: reqdata.unitid,
        materialid: reqdata.materialid,
      });

      await InvenotryUnit.findOneAndUpdate(
        {
          unitid: reqdata.unitid,
          materialid: reqdata.materialid,
        },
        {
          availableQty: inventory.availableQty + reqdata.requestedQty,
        }
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
  async getCompleteOrderRequestsForPeriod(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { from, to } = req.body;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    try {
      const list = await OrderReq.find({
        isCompleted: true,
        completedDate: { $gte: fromDate, $lte: toDate },
      });

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        list,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
