import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { IWorkspace } from "../type";
import { AxiosError } from "axios";

export const useResetInviteCode = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<IWorkspace>,
    Error,
    { workspaceId: string }
  >({
    mutationFn: async ({ workspaceId }) => {
      const { data } = await AxiosSecure.post(`/workspaces/${workspaceId}`);
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.data._id] });
    },
    onError(error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to reset invite code");
      }
    },
  });

  return mutation;
};
