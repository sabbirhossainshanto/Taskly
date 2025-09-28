import { model, Schema } from "mongoose";
import { ITask, TaskStatus } from "./task.interface";

const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    description: {
      type: String,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    workspace: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Workspace",
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model<ITask>("Task", taskSchema);
