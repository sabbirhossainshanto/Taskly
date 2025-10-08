"use client";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";
export const Projects = () => {
  const pathname = usePathname();
  const { open } = useCreateProjectModal();
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({
    workspaceId,
  });

  return (
    <div className="flex flex-col gap-y-2 px-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-primary-300">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-primary-300 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {data?.data &&
        data?.data?.map((project) => {
          const href = `/workspaces/${workspaceId}/projects/${project._id}`;
          const isActive = pathname === href;

          return (
            <Link href={href} key={project._id}>
              <div
                className={cn(
                  "flex items-center gap-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-primary-300 px-2 py-1",
                  isActive &&
                    "bg-secondary-300 shadow-sm hover:opacity-100 text-secondary-1100"
                )}
              >
                <ProjectAvatar image={project?.image} name={project?.name} />
                <span className="truncate">{project.name}</span>
              </div>
            </Link>
          );
        })}
    </div>
  );
};
