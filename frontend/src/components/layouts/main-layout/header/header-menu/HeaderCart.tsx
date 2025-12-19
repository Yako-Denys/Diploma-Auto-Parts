import { useRouter } from "next/navigation"

import { CartItem } from "./CartItem"
import { useCart } from "@/hooks/useCart"
import { useCheckout } from "./useCheckout"
import { useProfile } from "@/hooks/useProfile"
import { Button } from "@/components/ui/Button"
import { PUBLIC_URL } from "@/config/url.config"
import { Heading } from "@/components/ui/Heading"
import { formatPrice } from "@/utils/string/format-price"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet"

export function HeaderCart() {
  const router = useRouter()

  const { createPayment, isLoadingCreate } = useCheckout()
  const { user } = useProfile()

  const { items, total } = useCart()

  const handleClick = () => {
    user ? createPayment() : router.push(PUBLIC_URL.auth())
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Корзина</Button>
      </SheetTrigger>
      <SheetContent className="h-full flex flex-col">
        <Heading title="Корзина товаров" className="text-xl" />

        <div className="flex flex-col w-full flex-1">
          {items.length ? (
            items.map((item) => <CartItem item={item} key={item.id} />)
          ) : (
            <div className="text-sm text-muted-foreground">В корзині пусто!</div>
          )}
        </div>

        {items.length ? (
          <>
            <div className="text-lg font-medium">Разом до оплати: {formatPrice(total)}</div>
            <Button onClick={handleClick} variant="primary" disabled={isLoadingCreate}>
              Перейти до оплати
            </Button>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

