"use client"

import Link from "next/link"
import Image from "next/image"

import { StoreSwitcher } from "./StoreSwitcher"
import { Loader } from "@/components/ui/Loader"
import { useProfile } from "@/hooks/useProfile"
import { DASHBOARD_URL } from "@/config/url.config"
import { MobileSidebar } from "../sidebar/MobileSidebar"

export function Header() {
  const { user, isLoading } = useProfile()

  return (
    <div className="p-6 gap-x-4 h-full flex items-center bg-white border-b">
      <MobileSidebar />

      <div className="flex items-center gap-x-4 ml-auto">
        {isLoading ? (
          <Loader size="sm" />
        ) : (
          user && (
            <>
              <StoreSwitcher items={user.stores} />
              <Link href={DASHBOARD_URL.home()}>
                <Image src={user.picture} alt={user.name} width={42} height={42} className="rounded-full" />
              </Link>
            </>
          )
        )}
      </div>
    </div>
  )
}
