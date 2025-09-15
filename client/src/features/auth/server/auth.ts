/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AxiosSecure } from "@/lib/AxiosSecure";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { loginSchema, registerSchema } from "../schemas";
import z from "zod";
import { IResponse } from "@/types";
import { IUser } from "../type";

export const registerUser = async (payload: z.infer<typeof registerSchema>) => {
  try {
    const { data } = await AxiosSecure.post("/auth/register", payload);
    const cookiesStore = await cookies();
    cookiesStore.set("accessToken", data?.data?.accessToken);
    cookiesStore.set("refreshToken", data?.data?.refreshToken);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async (payload: z.infer<typeof loginSchema>) => {
  try {
    const { data } = await AxiosSecure.post("/auth/login", payload);
    const cookiesStore = await cookies();
    cookiesStore.set("accessToken", data?.data?.accessToken);
    cookiesStore.set("refreshToken", data?.data?.refreshToken);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const logOut = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("accessToken");
  cookiesStore.delete("refreshToken");
};

export const forgotPassword = async (payload: { email: string }) => {
  try {
    const { data } = await AxiosSecure.post("/auth/forgot-password", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getCurrent = async (): Promise<IUser | undefined> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  if (accessToken) {
    return await jwtDecode(accessToken);
  }
};

export const getToken = async () => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  return accessToken;
};

export const getNewAccessToken = async () => {
  try {
    const cookiesStore = await cookies();
    const refreshToken = cookiesStore.get("refreshToken")?.value;
    const res = await AxiosSecure({
      url: "/auth/refreshToken",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
