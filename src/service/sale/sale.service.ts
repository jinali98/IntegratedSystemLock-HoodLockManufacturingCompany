import { Request, Response, NextFunction } from 'express';
import { ProductType, SaleType } from '../../../types';
import LoggerGlobal from '../../../logger/loggerSingelton';
import errorResponseHandler from '../../../utils/errorResponseHandler';
import { ErrorMessages, ResponseStatus } from '../../../enums/enums';
import { customAlphabet } from 'nanoid';
import { Sale } from '../../model/sale/sale';
import { Product } from '../../model/product/product';

import {
  salesByPeriod,
  salesByProduct,
  salesByProductByPeriod,
} from "../../aggregators/aggregators";





const nanoid = customAlphabet('1234567890abcdef', 5);
const logger = LoggerGlobal.getInstance().logger;

export class SaleServices {
  private sale = {} as SaleType;

  async createSaleRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        productid,
        totalSoldQty,
        pricePerUnit,
        periodStartDate,
        periodEndDate,
      } = req.body;

      const sale = await Sale.create({
        saleid: nanoid(),
        productid,
        totalSoldQty,
        pricePerUnit,
        periodStartDate,
        periodEndDate,
      });

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: sale,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async getAllSalesRecords(req: Request, res: Response, next: NextFunction) {
    try {
      const sales = await Sale.find();

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: sales,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async getSaleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { saleid } = req.params;

      const saleRecords = await Sale.findOne({ saleid });
      const productDetails = await Product.findOne({
        productid: saleRecords.productid,
      });
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          productDetails,
          saleRecords,
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async getSalesForPeriod(req: Request, res: Response, next: NextFunction) {
    const { from, to } = req.body;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    try {
      const list = await salesByPeriod(fromDate, toDate);

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

  async getSalesByProductForPeriod(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { from, to } = req.body;
    const { productid } = req.params;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    try {
      const list = await salesByProductByPeriod(fromDate, toDate, productid);

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

  async getMonthlySalesByProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { month, year } = req.body;
    const { productid } = req.params;
    const fromDate = new Date(`${year}-${month}-01`);
    const toDate = new Date(`${year}-${month}-31`);

    try {
      const list = await salesByProductByPeriod(fromDate, toDate, productid);

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

  //Kavindra getYearlySalesByProduct
  async getYearlySalesByProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { year } = req.body;
    const { productid } = req.params;
    const fromDate = new Date(`${year}-01-01`);
    const toDate = new Date(`${year}-12-31`);

    try {
      const list = await salesByProductByPeriod(fromDate, toDate, productid);

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
    async viewMonthlySales(req: Request, res: Response, next: NextFunction) {
      const { month, year } = req.body;
      const fromDate = new Date(`${year}-${month}-01`);
      const toDate = new Date(`${year}-${month}-31`);
  
      try {
        const list = await salesByProduct(fromDate, toDate);
  
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
  
    async viewYearlySales(req: Request, res: Response, next: NextFunction) {
      const { year } = req.body;
      const fromDate = new Date(`${year}-01-01`);
      const toDate = new Date(`${year}-12-31`);
  
      try {
        const list = await salesByProduct(fromDate, toDate);
  
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


 