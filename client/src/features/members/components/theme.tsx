"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import { themeArray } from "@/static";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

export const Theme = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-xl font-bold">Themes</CardTitle>
        <CardDescription>
          Customize your Workspace by changing the appearance and theme color.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-7">
        <p className="text-xs text-primary-300 font-medium">Appearance</p>
        <div className="flex  items-center justify-between gap-3 mt-3">
          <div
            onClick={() =>
              setTheme((prev) => ({ ...prev, appearance: "light" }))
            }
            className={cn("cursor-pointer flex flex-col items-start gap-y-1")}
          >
            <Image
              className={cn(
                theme.appearance === "light" &&
                  "border-secondary-800 border-2 rounded-xl"
              )}
              src="/light.svg"
              alt="light-theme"
              height={200}
              width={250}
            />
            <p className="ml-2 text-muted-foreground font-semibold text-sm">
              Light
            </p>
          </div>
          <div
            onClick={() =>
              setTheme((prev) => ({ ...prev, appearance: "dark" }))
            }
            className="cursor-pointer flex flex-col items-start gap-y-1"
          >
            <Image
              className={cn(
                theme.appearance === "dark" &&
                  "border-secondary-800 border-2 rounded-xl"
              )}
              src="/dark.svg"
              alt="dark-theme"
              height={200}
              width={250}
            />
            <p className="ml-2 text-muted-foreground font-semibold text-sm">
              Dark
            </p>
          </div>
          <div
            onClick={() =>
              setTheme((prev) => ({ ...prev, appearance: "auto" }))
            }
            className="cursor-pointer flex flex-col items-start gap-y-1"
          >
            <Image
              className={cn(
                theme.appearance === "auto" &&
                  "border-secondary-800 border-2 rounded-xl"
              )}
              src="/auto.svg"
              alt="auto-theme"
              height={200}
              width={250}
            />
            <p className="ml-2 text-muted-foreground font-semibold text-sm">
              Auto
            </p>
          </div>
        </div>
        <p className="text-xs text-primary-300 font-medium mt-8">
          Taskly themes
        </p>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {themeArray?.map((item) => (
            <div
              onClick={() =>
                setTheme((prev) => ({ ...prev, theme: item.name }))
              }
              className={cn(
                "border px-2 py-3 rounded-md flex items-center gap-x-3 text-sm cursor-pointer",
                item.name === theme.theme
                  ? `${item.border} ${item.shadowBG}`
                  : "border-primary-900 text-muted-foreground"
              )}
              key={item.id}
            >
              <div
                className={cn(
                  item.bg,
                  "size-5 rounded flex items-center justify-center"
                )}
              >
                {item.name === theme.theme && (
                  <CheckIcon size={12} className="text-white" />
                )}
              </div>
              <div className={cn(item.name === theme.theme && item.color)}>
                {item.name.charAt(0).toUpperCase() + item.name.substring(1)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
