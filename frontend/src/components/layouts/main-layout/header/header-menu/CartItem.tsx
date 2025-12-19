import Link from "next/link"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"

import { useCart } from "@/hooks/useCart"
import { PUBLIC_URL } from "@/config/url.config"
import { useActions } from "@/hooks/useActions"
import { Button } from "@/components/ui/Button"
import { formatPrice } from "@/utils/string/format-price"
import { ICartItem } from "@/shared/types/cart.interface"

interface CartItemProps {
  item: ICartItem
}

export function CartItem({ item }: CartItemProps) {
  const { changeQuantity } = useActions()

  const { items } = useCart()
  const quantity = items.find((cartItem) => cartItem.id === item.id)?.quantity

  return (
    <div className="flex items-center mb-5">
      <Link href={PUBLIC_URL.product(item.product.id)} className="relative h-28 w-28 rounded-md overflow-hidden">
        <Image src={item.product.photo} alt={item.product.title} className="object-cover" fill />
      </Link>

      <div className="ml-6">
        <h2 className="font-medium line-clamp-1">{item.product.title}</h2>

        <p className="text-sm text-muted-foreground mt-1">{formatPrice(item.product.price)}</p>

        <div className="flex items-center mt-1">
          <Button
            size="icon"
            variant="ghost"
            className="size-7"
            disabled={quantity === 1}
            onClick={() => changeQuantity({ id: item.id, type: "minus" })}
          >
            <Minus className="size-4" />
          </Button>

          <input disabled readOnly value={quantity} className="w-10 text-center text-sm" />

          <Button
            size="icon"
            variant="ghost"
            className="size-7"
            onClick={() => changeQuantity({ id: item.id, type: "plus" })}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
