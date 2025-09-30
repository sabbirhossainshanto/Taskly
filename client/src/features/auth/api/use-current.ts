import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../type";
import { AxiosSecure } from "@/lib/AxiosSecure";

export const useCurrent = () => {
  const query = useQuery<unknown, Error, IResponse<IUser>>({
    queryKey: ["current"],
    queryFn: async () => {
      const { data } = await AxiosSecure.get("/users/me");
      return data;
    },
  });
  return query;
};
