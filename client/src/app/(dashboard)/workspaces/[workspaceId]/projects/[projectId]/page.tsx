import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/server/auth";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { getProject } from "@/features/projects/server/route";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ProjectIdProps {
  params: Promise<{ projectId: string }>;
}

const ProjectIdPage = async ({ params }: ProjectIdProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const { projectId } = await params;

  const initialValues = await getProject({
    projectId,
  });

  if (!initialValues) {
    throw new Error("Project not found");
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues?.data?.name}
            image={initialValues?.data?.image}
            className="size-8"
          />
          <p className="text-lg font-semibold">{initialValues.data?.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${initialValues.data?.workspaceId._id}/projects/${initialValues.data?._id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher />
    </div>
  );
};

export default ProjectIdPage;
