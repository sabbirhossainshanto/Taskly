import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { IMember } from "@/features/members/types";

export const useJoinWorkspace = () => {
  const mutation = useMutation<IResponse<IMember>, Error, { token: string }>({
    mutationFn: async ({ token }) => {
      const { data } = await AxiosSecure.post(`/workspaces/join`, { token });
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
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
