import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ITask } from "../types";
import { AxiosError } from "axios";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<IResponse<ITask>, Error, { taskId: string }>({
    mutationFn: async ({ taskId }) => {
      const { data } = await AxiosSecure.delete<IResponse<ITask>>(
        `/tasks/${taskId}`
      );
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({
        queryKey: ["project-analytics", data?.data?.project],
      });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to delete task");
      }
    },
  });

  return mutation;
};
