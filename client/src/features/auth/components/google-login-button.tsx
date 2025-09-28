/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import { useGoogleLogin } from "../api/use-google-login";

export default function GoogleLoginButton() {
  const { mutate } = useGoogleLogin();
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!, // from step 1
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "rectangular",
          text: "continue_with", // this shows “Continue as …”
          //   is_fedcm_supported: false,
        }
      );

      // Optional: show One Tap prompt as well
      window.google.accounts.id.prompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCredentialResponse(response: any) {
    mutate({ token: response.credential });
  }

  return <div id="googleSignInDiv"></div>;
}
