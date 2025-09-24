import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { ICreateTask, ITask } from "../types";
import { AxiosError } from "axios";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<ITask>,
    Error,
    { taskId: string; payload: Partial<ICreateTask> }
  >({
    mutationFn: async ({ payload, taskId }) => {
      const { data } = await AxiosSecure.patch(`/tasks/${taskId}`, payload);
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.data._id] });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to update task");
      }
    },
  });

  return mutation;
};
