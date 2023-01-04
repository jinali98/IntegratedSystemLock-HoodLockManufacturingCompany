import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import schedule from "node-schedule";
import errorResponseHandler from "../utils/errorResponseHandler";
import globalErrorHandler from "./api/error/error.controller";
import LoggerGlobal from "../logger/loggerSingelton";
import authRouter from "./api/auth/auth.controller";
import employeeRouter from "./api/employee/employee.contrlloer";
import jobRouter from "./api/job/job.controller";
import unitRouter from "./api/unit/unit.contoller";
import salesRouter from "./api/sale/sale.controller";
import productRouter from "./api/product/product.controller";
import inventoryRouter from "./api/inventory/inventory.controller";
import orderRequestsRouter from "./api/orderReq/orderReq.controller";

const logger = LoggerGlobal.getInstance().logger;

const app: Application = express();

// MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CRON JOBS

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/units", unitRouter);
app.use("/api/v1/sale", salesRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/order-req", orderRequestsRouter);

// ERROR HANDLER MIDDLEWARE FOR ROUTES
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(next(errorResponseHandler(400, `${req.originalUrl} does not exist`)));
});

app.use(globalErrorHandler);

//DB CONNECTION
const db: string = `${process.env.DATABASE_ATLAS}`;

mongoose
  .connect(db)
  .then(() => logger.info("connected to the DB"))
  .catch((err: any) => logger.error(err.message));

// SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info("listening on port 3000");
});
