"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useInviteModal } from "../hooks/use-invite-modal";
import { InviteModalWrapper } from "./invite-modal-wrapper";

export function InviteModal() {
  const { isOpen, setIsOpen } = useInviteModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <InviteModalWrapper />
    </ResponsiveModal>
  );
}
