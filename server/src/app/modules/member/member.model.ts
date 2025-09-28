import { model, Schema } from "mongoose";
import { IMember } from "./member.interface";

const memberSchema = new Schema<IMember>(
  {
    role: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Workspace",
    },
  },
  {
    timestamps: true,
  }
);

export const Member = model<IMember>("Member", memberSchema);
