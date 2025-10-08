import { model, Schema } from "mongoose";
import { IWorkspace } from "./workspace.interface";

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    inviteCode: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Workspace = model<IWorkspace>("Workspace", workspaceSchema);
