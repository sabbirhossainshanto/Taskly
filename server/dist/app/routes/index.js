"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const member_route_1 = require("../modules/member/member.route");
const workspace_route_1 = require("../modules/workspace/workspace.route");
const project_route_1 = require("../modules/project/project.route");
const user_route_1 = require("../modules/user/user.route");
const task_route_1 = require("../modules/task/task.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_route_1.userRoutes,
    },
    {
        path: "/members",
        route: member_route_1.memberRoutes,
    },
    {
        path: "/workspaces",
        route: workspace_route_1.workspaceRoutes,
    },
    {
        path: "/projects",
        route: project_route_1.projectRoutes,
    },
    {
        path: "/tasks",
        route: task_route_1.taskRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
