import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IWorkspace } from "../type";
import { AxiosError } from "axios";

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<IWorkspace>,
    Error,
    { workspaceId: string; inviteCode: string }
  >({
    mutationFn: async ({ workspaceId, inviteCode }) => {
      const { data } = await AxiosSecure.post(
        `/workspaces/${workspaceId}/join`,
        {
          inviteCode,
        }
      );
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.data._id] });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to join workspace");
      }
    },
  });

  return mutation;
};
