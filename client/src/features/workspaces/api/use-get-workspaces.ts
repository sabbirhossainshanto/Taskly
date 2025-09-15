import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IWorkspace } from "../type";

export const useGetWorkspaces = () => {
  const query = useQuery<unknown, Error, IResponse<IWorkspace[]>>({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const { data } = await AxiosSecure.get(`/workspaces`);
      return data;
    },
  });
  return query;
};
