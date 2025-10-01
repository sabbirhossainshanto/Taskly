import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { loginSchema } from "../schemas";
import { AxiosError } from "axios";
// import { loginMember } from "../server/auth";
// import Cookies from "js-cookie";
// import { AxiosSecure } from "@/lib/AxiosSecure";
import { loginMember } from "../server/auth";
import { AxiosSecure } from "@/lib/AxiosSecure";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<{ accessToken: string; refreshToken: string }>,
    Error,
    z.infer<typeof loginSchema>
  >({
    mutationFn: async (payload) => {
      // const { data } = await AxiosSecure.post("/auth/login", payload);
      const { data } = await AxiosSecure.post("/auth/login", payload);
      // Cookies.set("accessToken", data.data.accessToken, { secure: true });
      // Cookies.set("refreshToken", data.data.refreshToken, { secure: true });
      return data;
    },
    onSuccess() {
      toast.success("login successful");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      router.push("/workspaces");
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
