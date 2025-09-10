import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import config from "../../config";
import { generateToken } from "../../utils/generateToken";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";

const resisterMember = async (payload: IUser) => {
  const isAlreadyExist = await User.findOne({
    email: payload.email,
  });

  if (isAlreadyExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "This member is already exist!");
  }
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_round)
  );
  payload.password = hashedPassword;

  const result = await User.create(payload);

  const tokenObj = {
    name: result.name,
    email: result.email,
    _id: result?._id,
    role: result?.role,
  };
  const accessToken = generateToken(
    tokenObj,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = generateToken(
    tokenObj,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return { accessToken, refreshToken };
};

const loginMember = async (payload: IUser) => {
  const user = await User.findOne({
    email: payload.email,
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password not matched");
  }

  const tokenObj = {
    name: user.name,
    email: user.email,
    _id: user?._id,
    role: user?.role,
  };

  const accessToken = generateToken(
    tokenObj,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = generateToken(
    tokenObj,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return { accessToken, refreshToken };
};

export const authService = {
  resisterMember,
  loginMember,
};
