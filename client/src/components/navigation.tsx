"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoCheckCircle, GoHome } from "react-icons/go";

const routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  return (
    <ul className="flex flex-col">
      {routes?.map((item) => {
        const fullHref = `/workspaces/${workspaceId}${item.href}`;
        const isActive = pathname === fullHref;

        return (
          <Link key={item.href} href={fullHref} className="px-4">
            <div
              className={cn(
                "flex items-center gap-2.5 px-2 py-1 rounded-md font-medium  transition text-primary-200 text-sm my-0.5",
                isActive && "bg-secondary-300 shadow-sm  text-secondary-1000"
              )}
            >
              <item.icon
                className={cn(
                  "size-5",
                  isActive ? "text-secondary-1000" : "text-primary-200"
                )}
              />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
