"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const task_interface_1 = require("./task.interface");
const taskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    assignee: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: Object.values(task_interface_1.TaskStatus),
        required: true,
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Project",
    },
    workspace: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Workspace",
    },
});
exports.Task = (0, mongoose_1.model)("Task", taskSchema);
