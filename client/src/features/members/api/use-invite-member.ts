import { IUserRole } from "@/features/auth/type";
import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useInviteMember = () => {
  const mutation = useMutation<
    IResponse<null>,
    Error,
    { workspaceId: string; email: string; role: IUserRole }
  >({
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(
        `/members/invite-member`,
        payload
      );
      return data;
    },
    onSuccess(data) {
      toast.success(data?.message);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to invite member");
      }
    },
  });

  return mutation;
};
