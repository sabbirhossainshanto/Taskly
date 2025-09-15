import { IUser } from "./user.interface";
import { User } from "./user.model";

const getMe = async (user: IUser) => {
  return await User.findById(user._id);
};

export const userService = {
  getMe,
};
