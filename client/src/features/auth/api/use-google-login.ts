import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AxiosSecure } from "@/lib/AxiosSecure";

export const useGoogleLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<{ accessToken: string; refreshToken: string }>,
    Error,
    { token: string }
  >({
    mutationFn: async ({ token }) => {
      const { data } = await AxiosSecure.post("/auth/login-with-google", {
        token,
      });
      return data;
    },
    onSuccess() {
      toast.success("login successful");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      router.push("/");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    },
  });

  return mutation;
};
