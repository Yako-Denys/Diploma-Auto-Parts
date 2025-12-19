import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/Button"
import { useActions } from "@/hooks/useActions"
import { IProduct } from "@/shared/types/product.interface"

interface AddToCartButtonProps {
  isShort?: boolean
  product: IProduct
}

export function AddToCartButton({ product, isShort }: AddToCartButtonProps) {
  const { addToCart, removeFromCart } = useActions()
  const { items } = useCart()

  const currentElement = items.find((cartItem) => cartItem.product.id === product.id)

  return (
    <Button
      variant={currentElement ? "secondary" : "primary"}
      size={isShort ? "sm" : "lg"}
      className={isShort ? "" : "w-full"}
      onClick={() =>
        currentElement
          ? removeFromCart({ id: currentElement.id })
          : addToCart({ product, quantity: 1, price: product.price })
      }
    >
      {currentElement ? "Видалити з корзини" : "Додати до корзини"}
    </Button>
  )
}
