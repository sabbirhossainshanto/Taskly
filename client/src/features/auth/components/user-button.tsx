"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrent } from "../api/use-current";
import {
  CircleUserRoundIcon,
  CommandIcon,
  GiftIcon,
  Loader,
  LogOut,
  SunMoonIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLogout } from "../api/use-logout";
import { RiEmojiStickerLine } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { useThemeModal } from "@/features/members/hooks/use-theme-modal";

export const UserButton = () => {
  const { open: openThemeModal } = useThemeModal();
  const { data: user, isLoading } = useCurrent();

  const { mutate: logout } = useLogout();

  if (isLoading) {
    return (
      <div className="size-8 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const { name, email, image } = user.data;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0) ?? "U";
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-8 hover:opacity-75 transition border border-neutral-300">
          <AvatarImage src={image} alt="image" />
          <AvatarFallback className="bg-neutral-200 font-medium text-primary-300 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-96 px-2.5 space-y-2 py-4"
        sideOffset={10}
      >
        <div className="flex gap-4 py-2">
          <Avatar className="size-8 hover:opacity-75 transition border border-neutral-300">
            <AvatarImage src={image} alt="image" />
            <AvatarFallback className="bg-neutral-200 font-medium text-primary-300">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col ">
            <p className="text-sm font-medium text-primary-100">
              {name || "User"}
            </p>
            <p className="text-xs text-primary-100">Online</p>
          </div>
        </div>
        <DropdownMenuItem className=" flex cursor-pointer border font-light text-sm">
          <RiEmojiStickerLine />
          <span> Set Status</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer font-light text-sm  items-center py-2">
          <CircleUserRoundIcon />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={openThemeModal}
          className="flex cursor-pointer font-light text-sm  items-center py-2"
        >
          <SunMoonIcon />
          <span>Themes</span>
        </DropdownMenuItem>
        <Separator className="my-1 " />
        <DropdownMenuItem className="flex cursor-pointer font-light text-sm  items-center py-2">
          <CommandIcon />
          <span>Keyboard Shortcuts</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer font-light text-sm  items-center py-2">
          <GiftIcon />
          <span>Referrals</span>
        </DropdownMenuItem>

        <Separator className="my-1 " />

        <DropdownMenuItem
          onClick={() => logout()}
          className="flex cursor-pointer font-light text-sm  items-center py-2 "
        >
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
