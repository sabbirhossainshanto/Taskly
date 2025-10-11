"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    workspace: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Workspace",
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
}, {
    timestamps: true,
});
exports.Member = (0, mongoose_1.model)("Member", memberSchema);
