"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const invitePeopleSchema = z.object({
  email: z.email(),
  role: z.string(),
});

export const InviteModalWrapper = () => {
  const form = useForm<z.infer<typeof invitePeopleSchema>>({
    resolver: zodResolver(invitePeopleSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });

  const onSubmit = (values: z.infer<typeof invitePeopleSchema>) => {
    console.log(values);
  };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-xl font-bold">Invite people</CardTitle>
      </CardHeader>

      <CardContent className="px-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-1 text-xs text-primary-300">
                    Invite by email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter a email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-1 text-xs text-primary-300">
                    Invite as
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex items-center justify-end gap-x-3">
              <Button
                type="submit"
                className="w-fit"
                size="sm"
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-fit" size="sm">
                Send invite
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
