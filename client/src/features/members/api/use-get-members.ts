import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IMember } from "../types";

interface UseGetMembersProps {
  workspaceId: string;
  role?: string | null;
  searchTerm?: string | null;
}

export const useGetMembers = ({
  role,
  searchTerm,
  workspaceId,
}: UseGetMembersProps) => {
  const query = useQuery<unknown, Error, IResponse<IMember[]>>({
    queryKey: ["members", workspaceId, searchTerm, role],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (role) params.set("role", role);
      if (searchTerm) params.set("searchTerm", searchTerm);

      const { data } = await AxiosSecure.get(`/members/${workspaceId}`, {
        params,
      });
      return data;
    },
  });
  return query;
};
