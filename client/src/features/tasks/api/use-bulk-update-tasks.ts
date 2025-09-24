import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { ITask, TaskStatus } from "../types";
import { AxiosError } from "axios";

interface IBulkUpdateTasks {
  _id: string;
  status: TaskStatus;
  position: number;
}

export const useBulkUpdateTasks = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<ITask[]>,
    Error,
    { tasks: IBulkUpdateTasks[] }
  >({
    mutationFn: async ({ tasks }) => {
      const { data } = await AxiosSecure.post("/tasks/bulk-update", { tasks });
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to update tasks");
      }
    },
  });

  return mutation;
};
