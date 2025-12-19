"use client"

import { useProfile } from "@/hooks/useProfile"
import { Catalog } from "@/components/ui/catalog/Catalog"

export function Favorites() {
  const { user } = useProfile()

  if (!user) return null

  return (
    <div className="my-6">
      <Catalog title="Обране" products={user.favorites} />
    </div>
  )
}
