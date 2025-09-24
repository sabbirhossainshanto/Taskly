import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ITask } from "../types";

interface UseGetTaskProps {
  taskId: string;
}

export const useGetTask = ({ taskId }: UseGetTaskProps) => {
  const query = useQuery<{ taskId: string }, Error, IResponse<ITask>>({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const { data } = await AxiosSecure.get(`/tasks/${taskId}`);

      return data;
    },
  });
  return query;
};
