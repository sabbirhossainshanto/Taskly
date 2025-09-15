import { getCurrent } from "@/features/auth/server/auth";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspaces-form";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingsPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  const { workspaceId } = await params;

  const initialValues = await getWorkspace({
    workspaceId,
  });

  return (
    <div className="w-full lg:max-w-2xl">
      <EditWorkspaceForm initialValues={initialValues.data} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
