import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import config from "../../config";
import { generateToken } from "../../utils/generateToken";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import { verifyGoogleToken } from "../../utils/verifyGoogleToken";
import { TokenPayload } from "google-auth-library";

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
const loginWithGoogle = async (payload: { token: string }) => {
  if (!payload.token) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized");
  }

  const { email, name, picture } = (await verifyGoogleToken(
    payload.token
  )) as TokenPayload;

  const user = await User.findOne({
    email,
    name,
  });

  if (!user) {
    const newUser = await User.create({
      email,
      name,
      role: "member",
      image: picture,
    });
    const tokenObj = {
      name: newUser.name,
      email: newUser.email,
      _id: newUser?._id,
      role: newUser?.role,
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
  loginWithGoogle,
};
