import { getCurrent } from "@/features/auth/server/auth";
import { redirect } from "next/navigation";
import { WorkspaceIdJoinClient } from "./client";

interface WorkspaceIdJoinPageProps {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{
    token: string;
    email: string;
    authRoute: string;
  }>;
}

const WorkspaceIdJoinPage = async ({
  params,
  searchParams,
}: WorkspaceIdJoinPageProps) => {
  const { workspaceId } = await params;
  const { token, authRoute, email } = await searchParams;

  const user = await getCurrent();
  if (!user && token && email)
    redirect(
      `/${authRoute}?workspaceId=${workspaceId}&email=${email}&token=${token}`
    );

  if (!user && !token) {
    redirect("/sign-in");
  }

  return <WorkspaceIdJoinClient />;
};

export default WorkspaceIdJoinPage;
