import React from "react"
import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm relative">
      <div className="px-6 py-2">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-1">
        <div className="flex justify-between text-[2px]">
          <Link href="/about">
          <Button variant="link">About</Button>
          </Link>
          <Link href="/contact">
          <Button variant="link">Contact</Button>
          </Link>
          <Link href="/help">
          <Button variant="link">Help</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
