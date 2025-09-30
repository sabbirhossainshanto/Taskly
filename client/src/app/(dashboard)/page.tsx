"use client";

import { Button } from "@/components/ui/button";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { MembersList } from "@/features/workspaces/components/members-list";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// import { getCurrent } from "@/features/auth/server/auth";
// import { getWorkspaces } from "@/features/workspaces/server/workspaces";
// import { redirect } from "next/navigation";

export default function Home() {
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId: "68dbe9260a080e81a51626e5",
  });
  const { data } = useGetWorkspaces();
  const router = useRouter();
  useEffect(() => {
    // if (data && data?.data?.length > 0) {
    //   router.push(`/workspaces/${data?.data?.[0]?._id}`);
    // }

    if (data?.data?.length === 0) {
      router.push(`/workspaces/create}`);
    }
  }, [router, data]);

  //   const user = await getCurrent();

  //   if (!user) redirect("/sign-in");

  //   const data = await getWorkspaces();

  //   if (!data?.data || data?.data?.length === 0) {
  //     redirect("/workspaces/create");
  //   } else {
  //     redirect(`/workspaces/${data?.data?.[0]?._id}`);
  //   }
  return (
    <div>
      {members && members?.data?.length > 0 && (
        <div>{JSON.stringify(members)}</div>
      )}
    </div>
  );
}
