"use client";

// import { getCurrent } from "@/features/auth/server/auth";
// import { redirect } from "next/navigation";

import { SingleWorkspacePage } from "@/components/modules/single-workspace";

export default function WorkspacePage() {
  // const user = await getCurrent();
  // if (!user) redirect("/sign-in");
  return <SingleWorkspacePage />;
}
