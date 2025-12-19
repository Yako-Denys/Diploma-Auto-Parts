import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/utils/clsx"
import { Button } from "@/components/ui/Button"
import { PUBLIC_URL } from "@/config/url.config"
import { Catalog } from "@/components/ui/catalog/Catalog"
import { IProduct } from "@/shared/types/product.interface"
import { SITE_DESCRIPTION } from "@/constants/seo.constants"

const preferences = [
  "Швидко знайти потрібну автозапчастину за доступною ціною",
  "Купувати лише у перевірених і надійних продавців",
  "Отримувати гарантію на куплені запчастини",
  "Замовляти автозапчастини з доставкою по всій Україні",
  "Підібрати сумісні деталі саме для вашої моделі авто",
  "Замовляти запчастини оптом зі знижками для СТО чи бізнесу",
  "Знайти запчастини навіть для рідкісних або старих автомобілів",
  "Отримати професійну консультацію перед покупкою",
  "Користуватися зручною та зрозумілою платформою без зайвих складнощів",
]

interface HomeProps {
  newest: IProduct[]
  mostPopular: IProduct[]
}

export function Home({ newest, mostPopular }: HomeProps) {
  return (
    <>
      <div
        className={cn(
          "text-center flex flex-col items-center h-[calc(100vh-80px)] overflow-hidden",
          "bg-[url(/images/homepage-bg.png)] bg-no-repeat bg-right bg-contain",
          "flex items-center justify-center",
        )}
      >
        <div className="max-w-[1400px] w-full mx-auto px-4 flex flex-col items-start">
          <h1 className="text-4xl md:text-[46px] font-bold tracking-tight mb-6 max-w-3xl text-left leading-[1.1]">
            Все необхідне для вашого <br />
            авто – <span className="text-blue-600">в одному місці</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mb-4 text-left">{SITE_DESCRIPTION}</p>

          <Link href={PUBLIC_URL.explorer()}>
            <Button variant="primary" className="">
              За покупками
              <ArrowRight className="size-4 ml-2 transition-all" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-muted py-20 mt-20">
        <div className="max-w-[1400px] w-full mx-auto px-4 flex flex-col items-start">
          <h3 className="font-bold text-2xl mb-8">Ми підходимо вам, якщо:</h3>

          <ul className="grid grid-cols-3 align-center gap-x-10 gap-y-6">
            {preferences.map((preference) => (
              <li key={preference} className="flex gap-4 items-center max-w-lg">
                <img src="/images/checked.png" alt="Checked" />
                <span>{preference}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 flex flex-col items-start mt-20">
        <Catalog
          title="Хіти продажів"
          description="Найбільш популярні товари нашого магазину."
          linkTitle="Дізнатися більше"
          link={PUBLIC_URL.explorer()}
          products={mostPopular}
        />

        <hr className="my-10" />

        <Catalog
          title="Новинки"
          description="Нові товари нашого магазину."
          linkTitle="Дізнатися більше"
          link={PUBLIC_URL.explorer()}
          products={newest}
        />
      </div>
    </>
  )
}
