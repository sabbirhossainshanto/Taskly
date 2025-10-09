"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const workspaceId = params.get("workspaceId");
  const token = params.get("token");
  const email = params.get("email");
  const isUserInvited = !!(workspaceId && token && email);
  const isSignIn = pathname === "/sign-in";

  return (
    <main className="bg-neutral-50 min-h-screen bg-">
      <div className="mx-auto max-w-screen-2xl p-2 lg:p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" height={56} width={152} alt="logo" />
          {!isUserInvited && (
            <div className="flex items-center gap-x-3">
              {isSignIn ? (
                <p className="font-medium text-base text-neutral-900 hidden lg:block">
                  Don&apos;t have an account?
                </p>
              ) : (
                <p className="font-medium text-base text-neutral-900 hidden lg:block">
                  Already playing with Taskly?
                </p>
              )}
              <Button asChild variant="primary">
                <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                  {isSignIn ? "Sign UP" : "Sign In"}
                </Link>
              </Button>
            </div>
          )}
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14 ">
          <div className="login-page-new__main-bg hidden lg:block"></div>
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
