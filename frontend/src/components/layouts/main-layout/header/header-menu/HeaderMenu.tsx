"use client"

import Link from "next/link"
import Image from "next/image"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Loader } from "@/components/ui/Loader"
import { useProfile } from "@/hooks/useProfile"
import { HeaderCart } from "./HeaderCart"
import { CreateStoreModal } from "@/components/ui/modals/CreateStoreModal"
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from "@/config/url.config"

export function HeaderMenu() {
  const { user, isLoading } = useProfile()

  return (
    <div className="hidden items-center gap-x-2 ml-auto lg:flex">
      <HeaderCart />

      <Link href={PUBLIC_URL.explorer()}>
        <Button variant="ghost">Каталог</Button>
      </Link>

      {isLoading ? (
        <Loader size="sm" />
      ) : user ? (
        <>
          <Link href={DASHBOARD_URL.favorites()}>
            <Button variant="ghost">Обране</Button>
          </Link>
          {user.stores.length ? (
            <Link href={STORE_URL.home(user.stores[0].id)}>
              <Button variant="ghost">Мої магазини</Button>
            </Link>
          ) : (
            <CreateStoreModal>
              <Button variant="ghost">Створити магазин</Button>
            </CreateStoreModal>
          )}
          <Link href={DASHBOARD_URL.home()}>
            <Image width={40} height={40} alt={user.name} src={user.picture} className="rounded-full min-w-[40px]" />
          </Link>
        </>
      ) : (
        <Link href={PUBLIC_URL.auth()}>
          <Button variant="primary">
            <LogOut className="size-4 mr-2" />
            Увійти
          </Button>
        </Link>
      )}
    </div>
  )
}
