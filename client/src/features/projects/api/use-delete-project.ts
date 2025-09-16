import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IResponse } from "@/types";
import { IProject } from "../type";
import { AxiosSecure } from "@/lib/AxiosSecure";
import { AxiosError } from "axios";

export const useDeleteProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<IProject>,
    Error,
    { projectId: string }
  >({
    mutationFn: async ({ projectId }) => {
      const { data } = await AxiosSecure.delete(`/projects/${projectId}`);
      return data;
    },
    onSuccess(data) {
      toast.success(data?.message);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.data?._id] });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to delete project");
      }
    },
  });

  return mutation;
};
