import { model, Schema } from "mongoose";
import { IMember } from "./member.interface";

const memberSchema = new Schema<IMember>(
  {
    role: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    workspace: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Workspace",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Member = model<IMember>("Member", memberSchema);
