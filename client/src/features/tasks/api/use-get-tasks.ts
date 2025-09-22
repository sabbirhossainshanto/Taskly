import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ITask, TaskStatus } from "../types";

interface UseGetTasksProps {
  workspaceId: string;
  project?: string | null;
  status?: TaskStatus | null;
  assignee?: string | null;
  dueDate?: string | null;
  searchTerm?: string | null;
}

export const useGetTasks = ({
  workspaceId,
  assignee,
  dueDate,
  project,
  searchTerm,
  status,
}: UseGetTasksProps) => {
  const query = useQuery<{ workspaceId: string }, Error, IResponse<ITask[]>>({
    queryKey: [
      "tasks",
      workspaceId,
      assignee,
      dueDate,
      project,
      searchTerm,
      status,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (workspaceId) {
        params.append("workspaceId", workspaceId);
      }
      if (assignee) {
        params.append("assignee", assignee);
      }
      if (dueDate) {
        params.append("dueDate", dueDate);
      }
      if (project) {
        params.append("project", project);
      }
      if (searchTerm) {
        params.append("searchTerm", searchTerm);
      }
      if (status) {
        params.append("status", status);
      }
      const { data } = await AxiosSecure.get("/tasks", { params });

      return data;
    },
  });
  return query;
};
