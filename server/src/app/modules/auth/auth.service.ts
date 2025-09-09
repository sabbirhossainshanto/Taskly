import AppError from "../../errors/AppError";
import { IMember } from "../member/member.interface";
import { Member } from "../member/member.model";
import httpStatus from "http-status";

const resisterMember = async (payload: IMember) => {
  const isAlreadyExist = await Member.findOne({
    email: payload.email,
  });

  if (isAlreadyExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "This member is already exist!");
  }
  const result = await Member.create(payload);
  return result;
};

export const authService = {
  resisterMember,
};
