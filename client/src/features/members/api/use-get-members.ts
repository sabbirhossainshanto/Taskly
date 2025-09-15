import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IMember } from "../types";

interface UseGetMembersProps {
  workspaceId: string;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const query = useQuery<unknown, Error, IResponse<IMember[]>>({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const { data } = await AxiosSecure.get(`/members/${workspaceId}`);
      return data;
    },
  });
  return query;
};
