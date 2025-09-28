import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt_access_secret as Secret);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
