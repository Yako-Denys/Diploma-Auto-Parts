"use client"

import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"
import NextTopLoader from "nextjs-toploader"
import { type PropsWithChildren, useState } from "react"
import { PersistGate } from "redux-persist/integration/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { persistor, store } from "@/store/store"

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    }),
  )

  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NextTopLoader color="#3b82f6" height={5} />
          <Toaster />
          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}
