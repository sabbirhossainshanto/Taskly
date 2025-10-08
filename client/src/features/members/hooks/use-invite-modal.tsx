import { useQueryState, parseAsBoolean } from "nuqs";

export const useInviteModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "invite-modal",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
