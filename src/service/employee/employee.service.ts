import { Request, Response, NextFunction } from "express";
import { AdminUserType, EmployeeType, JobType } from "../../../types";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, JobStatus, ResponseStatus } from "../../../enums/enums";
import { customAlphabet } from "nanoid";
import { Employee } from "../../model/employee/employee";
const nanoid = customAlphabet("1234567890abcdef", 4);
const logger = LoggerGlobal.getInstance().logger;

export class EmployeeServices {
  private employee = {} as EmployeeType;

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    const { unitid, firstName, lastName, email, contactNumber, designation } =
      req.body;
    try {
      await Employee.create({
        unitid,
        firstName,
        lastName,
        email,
        contactNumber,
        empid: `${unitid}-${nanoid()}`,
        designation,
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
  async getAllEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const allEmployees = await Employee.find();

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: allEmployees,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async getEmployeeByUnitid(req: Request, res: Response, next: NextFunction) {
    const unitid = req.params.unitid;
    try {
      const emloyeeList = await Employee.find({ unitid });
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: emloyeeList,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    const empid = req.params.empid;
    try {
      const employeeDetails = await Employee.findOne({ empid });
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: employeeDetails,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
