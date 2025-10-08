import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/server/auth";
import { MembersList } from "@/features/workspaces/components/members-list";

const WorkspaceIdMembers = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return (
    <div className="w-full">
      <MembersList />
    </div>
  );
};

export default WorkspaceIdMembers;
