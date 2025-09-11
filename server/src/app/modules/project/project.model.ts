import { model, Schema } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: "Workspace",
  },
});

export const Project = model<IProject>("Project", projectSchema);
