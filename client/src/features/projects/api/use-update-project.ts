import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IResponse } from "@/types";
import { IProject } from "../type";
import { AxiosSecure } from "@/lib/AxiosSecure";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<IProject>,
    Error,
    { formData: FormData; projectId: string }
  >({
    mutationFn: async ({ formData, projectId }) => {
      const { data } = await AxiosSecure.patch(
        `/projects/${projectId}`,
        formData
      );
      return data;
    },
    onSuccess({ data }) {
      toast.success("Project updated");

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data._id] });
    },
    onError() {
      toast.error("Failed to update project");
    },
  });

  return mutation;
};
