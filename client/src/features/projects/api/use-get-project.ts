import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IProject } from "../type";

interface UseGetProjectProps {
  projectId: string;
}

export const useGetProject = ({ projectId }: UseGetProjectProps) => {
  const query = useQuery<{ workspaceId: string }, Error, IResponse<IProject>>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data } = await AxiosSecure.get(`/projects/${projectId}`);

      return data;
    },
  });
  return query;
};
