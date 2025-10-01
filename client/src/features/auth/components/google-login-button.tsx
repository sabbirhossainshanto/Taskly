/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";
import { useGoogleLogin } from "../api/use-google-login";

export default function GoogleLoginButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mutate } = useGoogleLogin();
  useEffect(() => {
    if (window.google && containerRef.current) {
      const width = containerRef.current.offsetWidth;
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
          text: "continue_with",
          width,
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

  return <div ref={containerRef} id="googleSignInDiv"></div>;
}
