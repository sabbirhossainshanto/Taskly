import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ITask, TaskStatus } from "../types";

interface UseGetTasksProps {
  workspace: string;
  project?: string | null;
  status?: TaskStatus | null;
  assignee?: string | null;
  dueDate?: string | null;
  searchTerm?: string | null;
}

export const useGetTasks = ({
  workspace,
  assignee,
  dueDate,
  project,
  searchTerm,
  status,
}: UseGetTasksProps) => {
  const query = useQuery<{ workspace: string }, Error, IResponse<ITask[]>>({
    queryKey: [
      "tasks",
      workspace,
      assignee,
      dueDate,
      project,
      searchTerm,
      status,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (workspace) {
        params.append("workspace", workspace);
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
