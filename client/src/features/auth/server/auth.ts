"use server";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../type";
import { cookies } from "next/headers";
import { AxiosSecure } from "@/lib/AxiosSecure";
import { loginSchema, registerSchema } from "../schemas";
import z from "zod";

export const getCurrent = async (): Promise<IUser | undefined> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (accessToken) {
    return await jwtDecode(accessToken);
  }
};

export const registerMember = async (
  payload: z.infer<typeof registerSchema>
) => {
  const cookiesStore = await cookies();
  const { data } = await AxiosSecure.post("/auth/register", payload);
  cookiesStore?.set("accessToken", data?.data?.accessToken);
  cookiesStore?.set("refreshToken", data?.data?.refreshToken);
  return data;
};

export const loginMember = async (payload: z.infer<typeof loginSchema>) => {
  const cookiesStore = await cookies();
  const { data } = await AxiosSecure.post("/auth/login", payload);
  cookiesStore?.set("accessToken", data?.data?.accessToken);
  cookiesStore?.set("refreshToken", data?.data?.refreshToken);
  return data;
};
export const loginWithGoogle = async ({ token }: { token: string }) => {
  const cookiesStore = await cookies();
  const { data } = await AxiosSecure.post("/auth/login-with-google", { token });
  cookiesStore?.set("accessToken", data?.data?.accessToken);
  cookiesStore?.set("refreshToken", data?.data?.refreshToken);
  return data;
};
export const logOut = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("accessToken");
  cookiesStore?.delete("refreshToken");
};
