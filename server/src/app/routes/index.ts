import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { memberRoutes } from "../modules/member/member.route";
import { workspaceRoutes } from "../modules/workspace/workspace.route";
import { projectRoutes } from "../modules/project/project.route";
import { userRoutes } from "../modules/user/user.route";
import { taskRoutes } from "../modules/task/task.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/members",
    route: memberRoutes,
  },
  {
    path: "/workspaces",
    route: workspaceRoutes,
  },
  {
    path: "/projects",
    route: projectRoutes,
  },
  {
    path: "/tasks",
    route: taskRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
