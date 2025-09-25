import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IProjectAnalytics } from "../type";

interface UseGetProjectAnalyticsProps {
  projectId: string;
}

export const useGetProjectAnalytics = ({
  projectId,
}: UseGetProjectAnalyticsProps) => {
  const query = useQuery<
    { workspaceId: string },
    Error,
    IResponse<IProjectAnalytics>
  >({
    queryKey: ["project-analytics", projectId],
    queryFn: async () => {
      const { data } = await AxiosSecure.get(
        `/projects/${projectId}/analytics`
      );

      return data;
    },
  });
  return query;
};
