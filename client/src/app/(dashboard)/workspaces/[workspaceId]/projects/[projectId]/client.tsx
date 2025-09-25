"use client";

import { Analytics } from "@/components/analytics";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const ProjectIdClient = () => {
  const projectId = useProjectId();
  const { data: projects, isLoading: isLoadingProjects } = useGetProject({
    projectId,
  });
  const { data: projectAnalytics, isLoading: isLoadingProjectAnalytics } =
    useGetProjectAnalytics({ projectId });

  const isLoading = isLoadingProjects || isLoadingProjectAnalytics;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!projects?.data) {
    return <PageError message="Project not found" />;
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={projects?.data?.name}
            image={projects?.data?.image}
            className="size-8"
          />
          <p className="text-lg font-semibold">{projects.data?.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${projects.data?.workspaceId._id}/projects/${projects.data?._id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      {projectAnalytics?.data && <Analytics data={projectAnalytics?.data} />}
      <TaskViewSwitcher hideProjectFilter />
    </div>
  );
};
