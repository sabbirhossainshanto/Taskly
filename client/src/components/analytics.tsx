import { IProjectAnalytics } from "@/features/projects/type";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { AnalyticsCard } from "./analytics-card";
import { DottedSeparator } from "./dotted-separator";

interface AnalyticsProps {
  data: IProjectAnalytics;
}

export const Analytics = ({ data }: AnalyticsProps) => {
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1  min-w-[190px]">
          <AnalyticsCard
            title="Total tasks"
            value={data?.taskCount}
            variant={data?.taskDifference > 0 ? "up" : "down"}
            increaseValue={data?.taskDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1 min-w-[190px]">
          <AnalyticsCard
            title="Assigned Tasks"
            value={data?.assignedTaskCount}
            variant={data?.assignedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data?.assignedTaskDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1 min-w-[190px]">
          <AnalyticsCard
            title="Completed Tasks"
            value={data?.completedTaskCount}
            variant={data?.completedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data?.completedTaskDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1 min-w-[190px]">
          <AnalyticsCard
            title="Overdue Tasks"
            value={data?.overdueTaskCount}
            variant={data?.overdueTaskDifference > 0 ? "up" : "down"}
            increaseValue={data?.overdueTaskDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1 min-w-[190px]">
          <AnalyticsCard
            title="Incomplete Tasks"
            value={data?.incompleteTaskCount as number}
            variant={
              (data?.incompleteTaskDifference as number) > 0 ? "up" : "down"
            }
            increaseValue={data?.incompleteTaskDifference as number}
          />
          <DottedSeparator direction="vertical" />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
