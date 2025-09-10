import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
import { IUser } from "../modules/user/user.interface";

const auth = catchAsync(async (req, resizeBy, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  let decoded;
  try {
    decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload & IUser;
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const { email } = decoded;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  req.user = decoded;
  next();
});
export default auth;
