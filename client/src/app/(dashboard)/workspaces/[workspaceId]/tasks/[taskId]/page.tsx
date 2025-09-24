import { getCurrent } from "@/features/auth/server/auth";
import { redirect } from "next/navigation";
import { SingleTaskClient } from "./client";

const SingleTaskPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <SingleTaskClient />;
};

export default SingleTaskPage;
