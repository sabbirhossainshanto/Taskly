import { getCurrent } from "@/features/auth/server/auth";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/server/route";
import { redirect } from "next/navigation";

interface ProjectIdSettingsPage {
  params: {
    projectId: string;
  };
}

const ProjectIdSettingsPage = async ({ params }: ProjectIdSettingsPage) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId: params.projectId,
  });

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues.data} />
    </div>
  );
};

export default ProjectIdSettingsPage;
