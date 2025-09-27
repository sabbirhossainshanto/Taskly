"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { IUser } from "../type";

export const getCurrent = async (): Promise<IUser | undefined> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  if (accessToken) {
    return await jwtDecode(accessToken);
  }
};
