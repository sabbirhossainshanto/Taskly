import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { IWorkspace } from "../type";
import { AxiosError } from "axios";

export const useUpdateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<IWorkspace>,
    Error,
    {
      formData: FormData;
      _id: string;
    }
  >({
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.patch(
        `/workspaces/${payload._id}`,
        payload.formData
      );
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({
        queryKey: ["workspaces", data.data?._id],
      });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to update workspace");
      }
    },
  });

  return mutation;
};
