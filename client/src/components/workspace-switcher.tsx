"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import {
  ChevronDownIcon,
  PanelRightCloseIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useGetMembers } from "@/features/members/api/use-get-members";

export const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data: workspaces } = useGetWorkspaces();
  const { data: workspace } = useGetWorkspace({ workspaceId });
  const { data: workspaceMembers } = useGetMembers({ workspaceId });
  const { open } = useCreateWorkspaceModal();

  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  if (!workspace?.data) {
    return null;
  }

  const filterWorkspaces = workspaces?.data?.filter(
    (item) => item?._id !== workspace?.data?._id
  );

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative  ml-4">
          <div className="flex justify-start items-center gap-x-2 font-medium p-1 hover:bg-primary/5 cursor-pointer w-fit rounded-md text-base">
            <WorkspaceAvatar
              className="size-7"
              name={workspace?.data?.name}
              image={workspace?.data?.image}
            />
            <span className="truncate"> {workspace?.data?.name}</span>
            <ChevronDownIcon size={10} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="top"
          className="w-80  space-y-1 pt-4 px-0 pb-0"
          sideOffset={10}
        >
          <div className="flex justify-start items-center gap-x-3 mb-4 px-4">
            <WorkspaceAvatar
              className="size-8"
              name={workspace?.data?.name}
              image={workspace?.data?.image}
            />
            <div className="flex flex-col">
              <span className="truncate text-sm"> {workspace?.data?.name}</span>
              <span className="text-xs text-primary-400 font-normal">
                Free forever {workspaceMembers?.data?.length} member
              </span>
            </div>
          </div>
          <DropdownMenuItem
            onClick={() => router.push(`/workspaces/${workspaceId}/setting`)}
            className=" flex cursor-pointer text-xs px-4"
          >
            <SettingsIcon />
            <span> Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/workspaces/${workspaceId}/billing`)}
            className=" flex cursor-pointer text-xs px-4"
          >
            <SettingsIcon />
            <span> Upgrade</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/workspaces/${workspaceId}/team`)}
            className=" flex cursor-pointer text-xs px-4"
          >
            <UsersIcon />
            <span> Manage Users</span>
          </DropdownMenuItem>
          {filterWorkspaces && filterWorkspaces?.length > 0 && (
            <div className="bg-primary/5 py-2 px-2">
              <div className="flex items-center justify-between px-2 mb-1.5">
                <p className="text-[10px] text-primary/60">Switch workspaces</p>
                <SearchIcon
                  className="text-primary/80 cursor-pointer"
                  size={10}
                />
              </div>

              {filterWorkspaces?.slice(0, 2).map((workspace) => (
                <DropdownMenuItem
                  className="flex justify-start items-center gap-x-3   hover:bg-primary/10 transition rounded-md cursor-pointer w-full"
                  onClick={() => onSelect(workspace?._id)}
                  key={workspace?._id}
                >
                  <WorkspaceAvatar
                    className="size-7"
                    name={workspace?.name}
                    image={workspace?.image}
                  />
                  <div className="flex flex-col items-start">
                    <span className="truncate text-sm font-medium">
                      {workspace?.name}
                    </span>
                    <span className="text-xs text-primary-400 font-normal">
                      Free forever
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}

          <div className="mt-2 bg-primary/5 py-1">
            <Button
              onClick={open}
              variant="ghost"
              className="flex justify-start items-center gap-x-3   p-1 px-2 hover:bg-primary/10 transition rounded-md cursor-pointer w-full"
            >
              <div className="bg-primary/10 rounded-md p-1">
                <PlusIcon size={12} className="text-primary/60" />
              </div>
              <p className="text-xs font-normal">Create Workspace</p>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost">
        <PanelRightCloseIcon className="text-primary-400" />
      </Button>
    </div>
  );
};
