import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { memberRoutes } from "../modules/member/member.route";
import { workspaceRoutes } from "../modules/workspace/workspace.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/members",
    route: memberRoutes,
  },
  {
    path: "/workspaces",
    route: workspaceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
