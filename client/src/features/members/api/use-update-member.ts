import { IUserRole } from "@/features/auth/type";
import { IWorkspace } from "@/features/workspaces/type";
import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<IWorkspace>,
    Error,
    { workspaceId: string; memberId: string; role: IUserRole }
  >({
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.patch(`/members`, payload);
      return data;
    },
    onSuccess() {
      toast.success("Member updated");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to update member");
      }
    },
  });

  return mutation;
};
