import { IResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { registerSchema } from "../schemas";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { AxiosSecure } from "@/lib/AxiosSecure";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IResponse<{ accessToken: string; refreshToken: string }>,
    Error,
    z.infer<typeof registerSchema>
  >({
    mutationKey: ["register"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post("/auth/register", payload);
      Cookies.set("accessToken", data.data.accessToken, { secure: true });
      Cookies.set("refreshToken", data.data.refreshToken, { secure: true });
      return data;
    },
    onSuccess() {
      toast.success("Registered successfully");
      queryClient.invalidateQueries({ queryKey: ["current"] });
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
