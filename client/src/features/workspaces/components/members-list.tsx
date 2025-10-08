"use client";

import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  DownloadIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/features/workspaces/components/data-table";
import { columns } from "@/features/workspaces/components/columns";
import * as XLSX from "xlsx";
import { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInviteModal } from "@/features/members/hooks/use-invite-modal";

export const MembersList = () => {
  const { open: openInviteModal } = useInviteModal();
  const ref = useRef<HTMLDivElement | null>(null);
  const workspaceId = useWorkspaceId();
  const { data } = useGetMembers({ workspaceId });

  const handleExport = () => {
    const workspaceName = data?.data?.[0]?.workspace?.name
      ?.split(" ")
      .join("-");
    const workbook = XLSX.utils.table_to_book(ref.current);
    XLSX.writeFile(workbook, `${workspaceName}-report.xlsb`);
  };

  return (
    <div className="w-full h-full p-4">
      <div className="flex items-center justify-between">
        <h6 className="text-primary text-lg md:text-2xl font-medium">
          Manage People
        </h6>
        <Button
          onClick={handleExport}
          size="sm"
          variant="outline"
          className="text-primary/70"
        >
          <DownloadIcon className="size-4" />
          <span className="text-sm">Export</span>
        </Button>
      </div>

      <div className="my-3 relative">
        <Input
          className="placeholder:text-sm pl-8"
          placeholder="Search or invite by email"
        />
        <SearchIcon className="absolute top-4 left-2.5 size-4" />
        <Button
          onClick={openInviteModal}
          className="absolute right-1.5 top-2.5 h-7"
          size="sm"
        >
          <PlusIcon className="size-3" />
          <span className="text-[10px]">Invite people</span>
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="bg-secondary-300 w-fit px-1 py-0.5 rounded-lg flex items-center gap-x-1 text-xs border border-primary-900 text-secondary-900 font-medium cursor-pointer">
            <span> All Users ({data?.data?.length})</span>
            <ChevronDownIcon className="size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuItem className="font-medium">Admin</DropdownMenuItem>
          <DropdownMenuItem className="font-medium">Member</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div ref={ref} className="mt-8">
        {data && data?.data?.length > 0 && (
          <DataTable columns={columns} data={data?.data} />
        )}
      </div>
    </div>
  );
};
