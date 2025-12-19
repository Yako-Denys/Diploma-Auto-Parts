"use client"

import { PropsWithChildren } from "react"

import { Footer } from "./footer/Footer"
import { Header } from "./header/Header"
import { usePathname } from "next/navigation"

export function MainLayout({ children }: PropsWithChildren<unknown>) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className={pathname === "/" ? "flex-1 overflow-hidden" : "mx-5 flex-1 lg:mx-14 overflow-hidden"}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
