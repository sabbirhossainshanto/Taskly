import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";
import { IUserRole } from "../modules/user/user.interface";

interface ITokenPayload {
  email: string;
  name: string;
  _id: Types.ObjectId;
  role: IUserRole;
}

export const generateToken = (
  payload: ITokenPayload,
  secret: Secret,
  jwtExpiresIn: string
) => {
  const options: SignOptions = {
    expiresIn: jwtExpiresIn as any,
  };

  return jwt.sign(payload, secret, options);
};
