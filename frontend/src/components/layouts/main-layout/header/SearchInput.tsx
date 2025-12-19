"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/Button"
import { PUBLIC_URL } from "@/config/url.config"
import { Input } from "@/components/ui/form-elements/Input"

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const router = useRouter()

  return (
    <div className="flex items-center relative">
      <Input
        value={searchTerm}
        placeholder="Яку запчастину шукаєте?"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-lg rounded-r-none focus-visible:ring-transparent pr-8"
      />

      <Button
        variant="primary"
        className="rounded-l-none"
        onClick={() => router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`))}
      >
        <Search className="size-4" />
      </Button>
    </div>
  )
}
