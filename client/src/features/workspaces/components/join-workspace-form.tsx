"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useJoinWorkspace } from "../api/use-join-workspace";
import { toast } from "sonner";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const query = useSearchParams();
  const token = query.get("token");
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    if (token) {
      mutate(
        {
          token,
        },
        {
          onSuccess({ data }) {
            router.push(`/workspaces/${data?.workspace?._id}`);
          },
        }
      );
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-7">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          <Button
            variant="secondary"
            type="button"
            asChild
            className="w-full lg:w-fit"
            size="lg"
            disabled={isPending}
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            onClick={onSubmit}
            size="lg"
            type="button"
            className="w-full lg:w-fit"
            disabled={isPending}
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
