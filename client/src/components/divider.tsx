import { cn } from "@/lib/utils";

export const Divider = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className, "flex items-center justify-center gap-x-3")}>
      <div className="border-b w-full border-neutral-200" />
      <div className="text-neutral-300">OR</div>
      <div className="border-b w-full border-neutral-200" />
    </div>
  );
};
