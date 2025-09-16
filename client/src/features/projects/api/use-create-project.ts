import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { IProject } from "../type";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<IResponse<IProject>, Error, FormData>({
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(
        `/projects/create-project`,
        payload
      );
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError() {
      toast.error("Failed to create project");
    },
  });

  return mutation;
};
