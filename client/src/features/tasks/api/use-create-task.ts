import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { ICreateTask, ITask } from "../types";
import { AxiosError } from "axios";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<IResponse<ITask>, Error, ICreateTask>({
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`/tasks/create-task`, payload);
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
        toast.error("Failed to create task");
      }
    },
  });

  return mutation;
};
