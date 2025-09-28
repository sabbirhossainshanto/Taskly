import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IProject } from "../type";

interface UseGetProjectProps {
  workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: UseGetProjectProps) => {
  const query = useQuery<{ workspaceId: string }, Error, IResponse<IProject[]>>(
    {
      queryKey: ["projects", workspaceId],
      enabled: !!workspaceId,
      queryFn: async () => {
        const { data } = await AxiosSecure.get(
          `/projects/workspace/${workspaceId}`
        );

        return data;
      },
    }
  );
  return query;
};
