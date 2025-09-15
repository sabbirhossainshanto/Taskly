import { logOut } from "@/features/auth/server/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => await logOut(),
    onSuccess() {
      toast.success("Logged out");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      router.refresh();
    },
    onError() {
      toast.error("Failed to logout");
    },
  });

  return mutation;
};
