"use client";

import { BarChart, Compass, LayoutDashboard, List, Users, Radio, Bot, Newspaper, FileMinus, User } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import React from "react";

const guestRoutes = [
  {
    icon: Compass,
    label: "Courses",
    href: "/",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/search",
  },
  {
    icon: FileMinus,
    label: "Blogs",
    href: "/teacher/blogs",
  },
  {
    icon: Users,
    label: "Community",
    href: "/d",
  },
  {
    icon: Radio,
    label: "Live",
    href: "/e",
  },
  {
    icon: Bot,
    label: "AI Help Desk",
    href: "/f",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: FileMinus,
    label: "Blogs",
    href: "/teacher/blogs",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: User,
    label: "Users",
    href: "/teacher/users",
  },
  {
    icon: Newspaper,
    label: "Updates",
    href: "/teacher/b",
  },
  {
    icon: Radio,
    label: "Go Live",
    href: "/teacher/c",
  },
]


export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}