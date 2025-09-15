import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IWorkspace } from "../type";
import { AxiosError } from "axios";

export const useCreateWorkspaces = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<IResponse<IWorkspace>, Error, FormData>({
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(
        `/workspaces/create-workspace`,
        payload
      );
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to create workspace");
      }
    },
  });

  return mutation;
};
