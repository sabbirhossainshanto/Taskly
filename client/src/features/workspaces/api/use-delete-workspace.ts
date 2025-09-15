import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IWorkspace } from "../type";
import { AxiosError } from "axios";

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<IWorkspace>,
    Error,
    { workspaceId: string }
  >({
    mutationFn: async ({ workspaceId }) => {
      const { data } = await AxiosSecure.delete(`/workspaces/${workspaceId}`);
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.data?._id],
      });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to delete workspace");
      }
    },
  });

  return mutation;
};
