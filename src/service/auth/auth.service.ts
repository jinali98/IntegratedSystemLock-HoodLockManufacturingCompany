import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { AdminUserType } from "../../../types";
import LoggerGlobal from "../../../logger/loggerSingelton";
import { TokenServices } from "../../service/token/token.service";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus } from "../../../enums/enums";
import { User } from "../../model/user/user";

const logger = LoggerGlobal.getInstance().logger;
const tokenVerification = new TokenServices();

export class AuthenticationServices {
  private adminUser = {} as AdminUserType;

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const admin = await User.findOne({ email }).select("+password").lean();
      this.adminUser = admin;

      if (
        !this.adminUser ||
        !(await bcrypt.compare(req.body.password, this.adminUser.password))
      )
        return next(
          errorResponseHandler(400, ErrorMessages.INVALID_CREDENTIALS)
        );

      const token = await tokenVerification.signToken(this.adminUser, next);
      const refreshToken = await tokenVerification.signRefreshToken(
        this.adminUser,
        next
      );

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        token,
        refreshToken,
        data: {
          user: {
            userDept: this.adminUser.dept,
          },
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
