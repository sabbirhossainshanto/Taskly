"use server";

import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { IWorkspace } from "./type";

export const getWorkspace = async ({
  workspaceId,
}: {
  workspaceId: string;
}): Promise<IResponse<IWorkspace>> => {
  const { data } = await AxiosSecure.get(`/workspaces/${workspaceId}`);

  return data;
};
