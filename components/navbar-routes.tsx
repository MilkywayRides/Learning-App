"use client";

import React, { useEffect, useState } from 'react';
import { useAuth, useUser, UserButton, useClerk } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { useTheme } from 'next-themes';
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();

  const { setTheme } = useTheme();


  const [isProfilePicLoaded, setIsProfilePicLoaded] = useState(false);

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/";

  useEffect(() => {
    setIsProfilePicLoaded(true);
  }, []);


  const { user, isSignedIn } = useUser();

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <>
            <Link href="/">
              <Button size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
          </>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger>
            {!isProfilePicLoaded ? (
              <Skeleton className="w-8 h-8 rounded-full">
                <span className="z-[100]">
                  <UserButton afterSignOutUrl="/" />
                </span>
              </Skeleton>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {isSignedIn && <DropdownMenuLabel className="text-md/[17px]">{user.fullName}</DropdownMenuLabel>}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                      </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                     Dark</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                    System Default</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.open('https://www.youtube.com', '_blank')}>
              YouTube
            </DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[#ef4444]">
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Notifications</SheetTitle>
            </SheetHeader>
            <SheetDescription>
              You will get all the latest updates here.
            </SheetDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  You Have a Class On 6:00PM
                </Label>
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  You Have a Class On 7:40PM
                </Label>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
