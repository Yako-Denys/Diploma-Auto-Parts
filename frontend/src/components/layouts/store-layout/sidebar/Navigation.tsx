"use client"

import { useParams } from "next/navigation"
import { BarChart, FolderKanban, LucideIcon, Settings, Star } from "lucide-react"

import { MenuItem } from "./MenuItem"
import { STORE_URL } from "@/config/url.config"

export function Navigation() {
  const params = useParams<{ storeId: string }>()

  const routes: {
    icon: LucideIcon
    value: string
    link: string
  }[] = [
    {
      icon: BarChart,
      link: STORE_URL.home(params.storeId),
      value: "Статистика",
    },
    {
      icon: FolderKanban,
      link: STORE_URL.products(params.storeId),
      value: "Товари",
    },
    {
      icon: Star,
      link: STORE_URL.reviews(params.storeId),
      value: "Відгуки",
    },
    {
      icon: Settings,
      link: STORE_URL.settings(params.storeId),
      value: "Налаштування",
    },
  ]

  return (
    <div className="flex flex-col w-full flex-1 mt-6">
      <div className="flex flex-col w-full space-y-3">
        {routes.map((route) => (
          <MenuItem key={route.value} route={route} />
        ))}
      </div>
    </div>
  )
}
