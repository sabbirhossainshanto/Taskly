import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { IMember } from "../types";
import { AxiosError } from "axios";

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<IMember>,
    Error,
    { workspaceId: string; memberId: string }
  >({
    mutationFn: async ({ workspaceId, memberId }) => {
      const { data } = await AxiosSecure.delete(
        `/members/${workspaceId}/${memberId}`
      );
      return data;
    },
    onSuccess() {
      toast.success("Member deleted");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to delete member");
      }
    },
  });

  return mutation;
};
