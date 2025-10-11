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
import { useMemberFilters } from "@/features/members/hooks/use-member-filter";
import { USER_ROLE } from "@/features/auth/type";

export const MembersList = () => {
  const [{ role, searchTerm }, setFilters] = useMemberFilters();
  const { open: openInviteModal } = useInviteModal();
  const ref = useRef<HTMLDivElement | null>(null);
  const workspaceId = useWorkspaceId();
  const { data } = useGetMembers({ workspaceId, role, searchTerm });

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
          onChange={(e) => setFilters({ searchTerm: e.target.value })}
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

      <div className="flex items-center gap-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="bg-secondary-200 w-fit px-1 py-2 rounded-md flex items-center gap-x-1 text-xs border border-primary-1000 text-secondary-900 font-medium cursor-pointer">
              <span> All Users ({data?.data?.length})</span>
              <ChevronDownIcon className="size-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            <DropdownMenuItem
              onClick={() => setFilters({ role: null })}
              className="font-medium cursor-pointer"
            >
              All member
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilters({ role: USER_ROLE.admin })}
              className="font-medium cursor-pointer"
            >
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilters({ role: USER_ROLE.member })}
              className="font-medium cursor-pointer"
            >
              Member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={() =>
            setFilters({
              role: null,
              searchTerm: null,
            })
          }
          variant="outline"
          size="sm"
          className="text-xs text-primary/60"
        >
          Reset Filter
        </Button>
      </div>

      <div ref={ref} className="mt-8">
        {data && data?.data?.length > 0 && (
          <DataTable columns={columns} data={data?.data} />
        )}
      </div>
    </div>
  );
};
