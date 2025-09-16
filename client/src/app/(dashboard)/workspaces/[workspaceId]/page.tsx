import { getCurrent } from "@/features/auth/server/auth";
import { redirect } from "next/navigation";

const WorkspaceIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return <div>WorkspaceIdPage</div>;
};

export default WorkspaceIdPage;
