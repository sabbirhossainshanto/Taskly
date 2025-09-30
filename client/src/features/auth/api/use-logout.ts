import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logOut } from "../server/auth";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => await logOut(),
    onSuccess() {
      toast.success("Logged out");
      queryClient.invalidateQueries();
      router.push("/sign-in");
    },
    onError() {
      toast.error("Failed to logout");
    },
  });

  return mutation;
};
