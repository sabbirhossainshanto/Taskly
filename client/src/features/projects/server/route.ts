import { AxiosSecure } from "@/lib/AxiosSecure";
import { IResponse } from "@/types";
import { IProject } from "../type";

export const getProject = async ({
  projectId,
}: {
  projectId: string;
}): Promise<IResponse<IProject>> => {
  try {
    const { data } = await AxiosSecure.get(`/projects/${projectId}`);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};
