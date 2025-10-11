"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const workspace_model_1 = require("../workspace/workspace.model");
const http_status_1 = __importDefault(require("http-status"));
const member_model_1 = require("./member.model");
const user_constant_1 = require("../user/user.constant");
const sendEmail_1 = require("../../utils/sendEmail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../user/user.model");
const inviteMemberHtml_1 = require("../../utils/inviteMemberHtml");
const mongoose_1 = __importDefault(require("mongoose"));
const inviteMember = async (payload) => {
    const workspace = await workspace_model_1.Workspace.findById(payload.workspaceId);
    const user = await user_model_1.User.findOne({
        email: payload.email,
    });
    const authRoute = user ? "sign-in" : "sign-up";
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwt_access_secret, {
        expiresIn: "1d",
    });
    const generatedLink = `${config_1.default.client_base_url}/workspaces/${payload.workspaceId}/join?email=${payload.email}&token=${token}&authRoute=${authRoute}`;
    const html = (0, inviteMemberHtml_1.inviteMemberHtml)({
        acceptLink: generatedLink,
        declineLink: generatedLink,
        email: config_1.default.email_user,
        mailTo: `mailto:${config_1.default.email_user}`,
        name: "Sabbir Hossain",
        workspaceName: workspace ? workspace?.name : "Workspace",
    });
    await (0, sendEmail_1.sendEmail)(payload.email, html);
};
const getWorkspaceMember = async (workspaceId, query) => {
    const { role, searchTerm } = query;
    // Check if workspace exists
    const isWorkspaceExist = await workspace_model_1.Workspace.findById(workspaceId);
    if (!isWorkspaceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This workspace does not exist");
    }
    // ✅ Explicitly type pipeline as mongoose.PipelineStage[]
    const pipeline = [
        {
            $match: {
                workspace: new mongoose_1.default.Types.ObjectId(workspaceId),
                ...(role ? { role } : {}),
            },
        },
        {
            $lookup: {
                from: "users", // must match your actual User collection name
                localField: "user",
                foreignField: "_id",
                as: "user",
            },
        },
        { $unwind: "$user" },
    ];
    // Add search condition if searchTerm exists
    if (searchTerm) {
        pipeline.push({
            $match: {
                $or: [
                    { role: { $regex: searchTerm, $options: "i" } }, // from Member
                    { "user.email": { $regex: searchTerm, $options: "i" } }, // from User
                    { "user.name": { $regex: searchTerm, $options: "i" } }, // from User
                ],
            },
        });
    }
    pipeline.push({
        $lookup: {
            from: "workspaces",
            localField: "workspace",
            foreignField: "_id",
            as: "workspace",
        },
    });
    pipeline.push({ $unwind: "$workspace" });
    // Run aggregation
    const members = await member_model_1.Member.aggregate(pipeline);
    return members;
};
const deleteWorkspaceMember = async (workspaceId, memberId, user) => {
    const isAdmin = await member_model_1.Member.findOne({
        user: user._id,
        workspace: workspaceId,
    });
    if (isAdmin?.role !== user_constant_1.USER_ROLE.admin) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are unauthorized");
    }
    const workspace = await workspace_model_1.Workspace.findById(workspaceId);
    if (!workspace) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Workspace not exist");
    }
    const deletedMember = await member_model_1.Member.findOne({
        workspace: workspaceId,
        user: memberId,
    });
    if (!deletedMember) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This member is not exist");
    }
    const allMemberInWorkspace = await member_model_1.Member.find({
        workspace: workspaceId,
    });
    if (allMemberInWorkspace.length === 1) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Can not delete the only member");
    }
    const result = await member_model_1.Member.deleteOne({
        workspace: workspaceId,
        user: memberId,
    });
    return result;
};
const updateWorkspaceMember = async (payload, user) => {
    const { memberId, role, workspaceId } = payload;
    const isAdmin = await member_model_1.Member.findOne({
        user: user._id,
        workspace: workspaceId,
    });
    if (isAdmin?.role !== user_constant_1.USER_ROLE.admin) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are unauthorized");
    }
    const workspace = await workspace_model_1.Workspace.findById(workspaceId);
    if (!workspace) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Workspace not exist");
    }
    const updatingMember = await member_model_1.Member.findOne({
        workspace: workspaceId,
        user: memberId,
    });
    if (!updatingMember) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This member is not exist");
    }
    const allMemberInWorkspace = await member_model_1.Member.find({
        workspace: workspaceId,
    });
    if (allMemberInWorkspace.length === 1) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Can not update the only member");
    }
    const result = await member_model_1.Member.updateOne({
        workspace: workspaceId,
        user: memberId,
    }, {
        role,
    });
    return result;
};
exports.memberService = {
    getWorkspaceMember,
    deleteWorkspaceMember,
    updateWorkspaceMember,
    inviteMember,
};
