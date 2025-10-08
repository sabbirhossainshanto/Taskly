import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUserRole, USER_ROLE } from "@/features/auth/type";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { IMember } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";
import { MoreVerticalIcon } from "lucide-react";

interface MemberActionsProps {
  member: IMember;
}

export const MemberActions = ({ member }: MemberActionsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Remove member",
    "This member will be removed from workspace",
    "destructive"
  );
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const handleUpdateMember = (
    memberId: string,
    role: IUserRole,
    workspaceId: string
  ) => {
    updateMember({
      memberId,
      role,
      workspaceId,
    });
  };

  const handleDeleteMember = async (workspaceId: string, memberId: string) => {
    const ok = await confirm();
    if (!ok) return;
    deleteMember(
      { memberId, workspaceId },
      {
        onSuccess() {
          window.location.reload();
        },
      }
    );
  };
  return (
    <DropdownMenu>
      <ConfirmDialog />
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto" variant="secondary" size="icon">
          <MoreVerticalIcon className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem
          className="font-medium"
          onClick={() =>
            handleUpdateMember(
              member?.user?._id,
              USER_ROLE.admin,
              member.workspace._id
            )
          }
          disabled={isUpdatingMember}
        >
          Set as Administrator
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-medium"
          onClick={() =>
            handleUpdateMember(
              member.user._id,
              USER_ROLE.member,
              member.workspace._id
            )
          }
          disabled={isUpdatingMember}
        >
          Set as Member
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-medium text-amber-700"
          onClick={() =>
            handleDeleteMember(member.workspace._id, member.user._id)
          }
          disabled={isDeletingMember}
        >
          Remove {member.user.name}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
