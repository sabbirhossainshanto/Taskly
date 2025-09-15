/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosSecure } from "@/lib/AxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, any>({
    mutationFn: async () => {
      const { data } = await AxiosSecure.delete(`/workspaces`);
      return data;
    },
    onSuccess({ data }) {
      toast.success("Joined workspace");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError() {
      toast.error("Failed to join workspace");
    },
  });

  return mutation;
};
