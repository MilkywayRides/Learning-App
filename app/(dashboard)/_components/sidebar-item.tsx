"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import React from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "mx-3 my-0.5 flex rounded-md items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && " text-sky-700 bg-[#f0fdfa] hover:bg-sky-200/20 hover:text-sky-700 dark:text-[#000000] dark:bg-[#262626]"
      )}
    >
      <div className="flex items-center gap-x-2 py-3 dark:text-white">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 dark:text-white",
            isActive && "text-sky-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-sky-500 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  )
}