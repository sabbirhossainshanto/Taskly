import { IProjectAnalytics } from "@/features/projects/type";
import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface UseGetWorkspaceAnalyticsProps {
  workspaceId: string;
}

export const useGetWorkspaceAnalytics = ({
  workspaceId,
}: UseGetWorkspaceAnalyticsProps) => {
  const query = useQuery<
    { workspaceId: string },
    Error,
    IResponse<IProjectAnalytics>
  >({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      const { data } = await AxiosSecure.get(
        `/workspaces/${workspaceId}/analytics`
      );

      return data;
    },
  });
  return query;
};
