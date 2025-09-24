/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { IWorkspace } from "../type";

export const getWorkspaces = async (): Promise<IResponse<IWorkspace[]>> => {
  try {
    const { data } = await AxiosSecure.get("/workspaces");
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};
