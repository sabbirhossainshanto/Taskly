import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { loginSchema } from "../schemas";
import { AxiosError } from "axios";
import { loginUser } from "../server/auth";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<{ accessToken: string; refreshToken: string }>,
    Error,
    z.infer<typeof loginSchema>
  >({
    mutationFn: async (payload) => {
      const { data } = await loginUser(payload);
      return data;
    },
    onSuccess() {
      toast.success("login successful");
      queryClient.invalidateQueries({ queryKey: ["current", "workspaces"] });
      router.push("/");
    },
    onError(error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    },
  });

  return mutation;
};
