"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workspace = void 0;
const mongoose_1 = require("mongoose");
const workspaceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
exports.Workspace = (0, mongoose_1.model)("Workspace", workspaceSchema);
