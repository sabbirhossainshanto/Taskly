import { OAuth2Client } from "google-auth-library";
import config from "../config";

const client = new OAuth2Client(config.google_client_id);

export const verifyGoogleToken = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.google_client_id,
  });

  const payload = ticket.getPayload();
  return payload;
};
