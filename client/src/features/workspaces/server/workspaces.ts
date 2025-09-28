"use server";

import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { IWorkspace } from "../type";
import { cookies } from "next/headers";

export const getWorkspaces = async (): Promise<IResponse<IWorkspace[]>> => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("accessToken")?.value;
    const { data } = await AxiosSecure.get("/workspaces", {
      headers: {
        Authorization: token,
      },
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};
