import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { PUBLIC_URL } from "@/config/url.config"
import { NO_INDEX_PAGE } from "@/constants/seo.constants"

export const metadata: Metadata = {
  title: "Дякуємо за покупку",
  ...NO_INDEX_PAGE,
}

export default function ThanksPage() {
  return (
    <div className="my-24 py-20 mx-auto text-center flex flex-col items-center max-w-4xl space-y-6">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Дякуємо за покупку</h1>
      <p className="text-lg text-muted-foreground">
        Дякую за ваше замовлення! Ми цінуємо вашу довіру і докладемо всіх зусиль, щоб доставити ваше замовлення
        якнайшвидше.
      </p>

      <Link href={PUBLIC_URL.home()}>
        <Button variant="primary">
          На головну
          <ArrowRight />
        </Button>
      </Link>
    </div>
  )
}
