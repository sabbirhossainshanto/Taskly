"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";
import { Divider } from "@/components/divider";
import GoogleLoginButton from "./google-login-button";
import { useRouter, useSearchParams } from "next/navigation";

export const SignInCard = () => {
  const router = useRouter();
  const params = useSearchParams();

  const workspaceId = params.get("workspaceId");
  const token = params.get("token");
  const email = params.get("email");
  const isUserInvited = !!(workspaceId && token && email);
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: email ? email : "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values, {
      onSuccess() {
        if (isUserInvited) {
          router.push(`/workspaces/${workspaceId}/join?token=${token}`);
        } else {
          router.push("/");
        }
      },
    });
  };
  return (
    <Card className="w-full h-full md:w-[480px] border-none shadow-none z-10 gap-2">
      <CardHeader className="flex flex-col items-center justify-center text-center px-7">
        <CardTitle className="text-2xl lg:text-3xl font-bold">
          {isUserInvited ? "Login to join workspace" : "Welcome back!"}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 md:px-[50]  flex flex-col gap-y-2">
        <GoogleLoginButton />
        {isUserInvited && (
          <span className="text-[10px] text-primary-500">
            Note: Please login by invited email to join workspace
          </span>
        )}
      </CardContent>
      <Divider className="px-3 md:px-[50px]" />

      <CardContent className="px-3 md:px-[50px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-1 text-[12px]">Work Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!!email}
                      {...field}
                      type="email"
                      placeholder="Enter your work email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-1 text-[12px]">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
              size="lg"
            >
              Log In
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardContent className="px-3 md:px-[50px] flex items-center justify-center">
        <p>
          Don&apos;t have an account ?
          <Link href="/sign-up">
            <span className="text-blue-700">&nbsp;Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
