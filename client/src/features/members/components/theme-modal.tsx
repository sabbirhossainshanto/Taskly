"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useThemeModal } from "@/features/members/hooks/use-theme-modal";
import { Theme } from "./theme";

export function ThemeModal() {
  const { isOpen, setIsOpen } = useThemeModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <Theme />
    </ResponsiveModal>
  );
}
