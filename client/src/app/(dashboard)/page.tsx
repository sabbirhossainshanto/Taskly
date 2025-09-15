import { getCurrent } from "@/features/auth/server/auth";
import { getWorkspaces } from "@/features/workspaces/server/workspaces";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const data = await getWorkspaces();

  if (data?.data?.length === 0) {
    redirect("workspaces/create");
  } else {
    redirect(`/workspaces/${data?.data[0]._id}`);
  }
}
