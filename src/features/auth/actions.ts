import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constant";

export const getCurrent = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies();
    const token = session.get(AUTH_COOKIE);
    if (!token) return null;
    client.setSession(token.value);
    const account = new Account(client);

    return await account.get();
  } catch {
    return null;
  }
};
