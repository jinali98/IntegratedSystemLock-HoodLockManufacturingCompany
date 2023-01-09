import { Request, Response, NextFunction } from "express";
import { ProductType } from "../../../types";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus } from "../../../enums/enums";
import { customAlphabet } from "nanoid";
import { Product } from "../../model/product/product";
const nanoid = customAlphabet("1234567890abcdef", 5);
const logger = LoggerGlobal.getInstance().logger;

export class ProductServices {
  private product = {} as ProductType;

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productName, productDescription } = req.body;

      const product = await Product.create({
        productid: nanoid(),
        productName,
        productDescription,
      });

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: product,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await Product.find();

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: products,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async updateProducts(req: Request, res: Response, next: NextFunction) {
    const { productid } = req.params;
    const { productName, productDescription } = req.body;
    try {
      await Product.findOneAndUpdate(
        { productid },
        { productName: productName, productDescription: productDescription }
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
