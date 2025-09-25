"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    workspaceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Workspace",
    },
});
exports.Project = (0, mongoose_1.model)("Project", projectSchema);
