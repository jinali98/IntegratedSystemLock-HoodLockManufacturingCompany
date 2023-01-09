import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import { ErrorMessages } from "../../enums/enums";
import Joi from "joi";

export class UserInputValidators {
  userLoginValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }

  refreshTokenValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      refreshToken: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  createJobValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      unitid: Joi.string().required(),
      expectedStartDate: Joi.string().required(),
      allocatedHours: Joi.number().required(),
      description: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  assignJobValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      jobid: Joi.string().required(),
      empid: Joi.string().required(),
      materials: Joi.array().required()
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  updateJobValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      jobid: Joi.string().required(),
      status: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  completeJobValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      jobid: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  createEmployeeValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      unitid: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      contactNumber: Joi.string().required(),
      designation: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  createProductValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      productName: Joi.string().required(),
      productDescription: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  createSaleValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      productid: Joi.string().required(),
      totalSoldQty: Joi.number().required(),
      pricePerUnit: Joi.number().required(),
      periodStartDate: Joi.string().required(),
      periodEndDate: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  createInvenotryValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      materialName: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  updateInventoryValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      materialName: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  whProcessOrderValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      requestedQty: Joi.number().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  pdUpdateOrderValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      pricePerUnit: Joi.number().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  createInventoryUnitValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      materialid: Joi.string().required(),
      availableQty: Joi.number().required(),
      lowLevelQty: Joi.number().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  updateInventoryUnitValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      lowLevelQty: Joi.number().required(),
      materialid: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }

  dateRangeValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      from: Joi.string().required(),
      to: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }

  dateRangeMonthlyValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      year: Joi.string().required(),
      month: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
}
