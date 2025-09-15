import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { registerSchema } from "../schemas";
import { AxiosError } from "axios";
import { registerUser } from "../server/auth";

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<{ accessToken: string; refreshToken: string }>,
    Error,
    z.infer<typeof registerSchema>
  >({
    mutationKey: ["register"],
    mutationFn: async (payload) => {
      const { data } = await registerUser(payload);
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["current"] });
      router.push("/");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to register");
      }
    },
  });

  return mutation;
};
