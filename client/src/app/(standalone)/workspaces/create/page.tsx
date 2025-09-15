import { getCurrent } from "@/features/auth/server/auth";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspaces-form";
import { redirect } from "next/navigation";

const WorkspaceCreatePage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
};

export default WorkspaceCreatePage;
