"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { SettingsIcon, UserIcon } from "lucide-react";
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
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UserIcon,
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
          <Link key={item.href} href={fullHref}>
            <div
              className={cn(
                "flex items-center gap-2.5 px-2 py-1 rounded-md font-medium  transition text-primary text-sm my-0.5",
                isActive && "bg-secondary-300 shadow-sm  text-secondary-1000"
              )}
            >
              <item.icon
                className={cn(
                  "size-5",
                  isActive ? "text-secondary-1000" : "text-primary"
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
