"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import { cn } from "@/utils/clsx"

interface MenuItemProps {
  route: {
    icon: LucideIcon
    value: string
    link: string
  }
}

export function MenuItem({ route }: MenuItemProps) {
  const pathname = usePathname()

  return (
    <Link
      href={route.link}
      className={cn(
        "flex items-center gap-x-3 text-slate-500 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-blue-200/20 hover:text-blue-500 hover:drop-shadow-sm bg-transparent transition-all duration-200",
        { "text-sm text-blue-500 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-500": pathname === route.link },
      )}
    >
      <route.icon />
      {route.value}
    </Link>
  )
}
