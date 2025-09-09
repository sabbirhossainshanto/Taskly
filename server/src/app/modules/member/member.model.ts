import { model, Schema } from "mongoose";
import { IMember } from "./member.interface";

const memberSchema = new Schema<IMember>({
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
});

export const Member = model<IMember>("Member", memberSchema);
