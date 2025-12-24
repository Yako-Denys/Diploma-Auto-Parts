import { type NextRequest, NextResponse } from "next/server"

import { PUBLIC_URL } from "./config/url.config"
import { EnumTokens } from "./services/auth/auth-token.serice"

export async function middleware(request: NextRequest) {
  if (request.method === "POST" && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/", request.url), 303)
  }

  const pathname = request.nextUrl.pathname

  if (pathname.startsWith("/explorer") || pathname.startsWith("/product") || pathname === "/") {
    return NextResponse.next()
  }

  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

  if (pathname === PUBLIC_URL.auth()) {
    const hasRefresh = Boolean(refreshToken) && refreshToken !== "undefined" && refreshToken !== "null"
    const hasAccess = Boolean(accessToken) && accessToken !== "undefined" && accessToken !== "null"

    if (hasRefresh && hasAccess) {
      return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.url))
    }

    const res = NextResponse.next()
    try {
      if (request.nextUrl.hostname.includes("localhost")) {
        res.headers.set("x-debug-refresh-token", String(refreshToken ?? "(none)"))
        res.headers.set("x-debug-access-token", String(accessToken ?? "(none)"))
      }
    } catch (e) {
      console.log(e)
    }

    return res
  }

  const hasRefresh = Boolean(refreshToken) && refreshToken !== "undefined" && refreshToken !== "null"
  const hasAccess = Boolean(accessToken) && accessToken !== "undefined" && accessToken !== "null"
  if (!hasRefresh && !hasAccess) {
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/store/:path*", "/auth", "/"],
}
