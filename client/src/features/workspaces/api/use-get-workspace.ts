import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IWorkspace } from "../type";

interface UseGetWorkspaceProps {
  workspaceId: string;
}

export const useGetWorkspace = ({ workspaceId }: UseGetWorkspaceProps) => {
  const query = useQuery<unknown, Error, IResponse<IWorkspace>>({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const { data } = await AxiosSecure.get(`/workspaces/${workspaceId}`);
      return data;
    },
  });
  return query;
};
