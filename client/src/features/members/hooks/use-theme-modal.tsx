import { useQueryState, parseAsBoolean } from "nuqs";

export const useThemeModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "theme",
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
