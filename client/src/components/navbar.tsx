/* eslint-disable @next/next/no-img-element */
"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
// import { Button } from "./ui/button";
// import { PlusCircleIcon } from "lucide-react";

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <nav
      className={cn(
        "px-6 py-1 flex items-center justify-between w-full",
        theme.appearance === "light" ? "bg-secondary-1100" : "bg-navbar"
      )}
    >
      <div className="flex-col hidden lg:flex">
        <img className="size-4" src="/logo2.svg" alt="Logo" />
      </div>
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        {/* <Button variant="ghost" size="sm" className="text-white font-semibold">
          <PlusCircleIcon />
          <span>New</span>
        </Button> */}
        <UserButton />
      </div>
    </nav>
  );
};
