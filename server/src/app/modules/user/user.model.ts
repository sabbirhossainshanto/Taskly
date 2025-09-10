import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const memberSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

export const User = model<IUser>("User", memberSchema);
