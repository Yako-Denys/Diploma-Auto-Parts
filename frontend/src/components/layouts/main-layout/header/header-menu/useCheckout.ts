import { useMemo } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { useCart } from "@/hooks/useCart"
import { useActions } from "@/hooks/useActions"
import { useProfile } from "@/hooks/useProfile"
import { orderService } from "@/services/order.service"
/* 
export class OrderDto {
  status: EnumOrderStatus
  orderId: string
  items: OrderItemDto[]
}
export class OrderItemDto {
  quantity: number
  price: number
  productId: string
  storeId: string
}
*/

const generateId = (length = 10) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const useCheckout = () => {
  const { items } = useCart()

  const { user } = useProfile()

  const { reset } = useActions()

  const router = useRouter()

  const { mutate: createPayment, isPending: isLoadingCreate } = useMutation({
    mutationKey: ["create order and payment"],
    mutationFn: () => {
      const cartItems = items.map((item) => ({
        price: item.price,
        quantity: item.quantity,
        productId: item.product.id,
        storeId: item.product.storeId,
      }))

      const totalPrice = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
      const itemsNames = items.map((item) => item.product.title).join("; ")

      orderService.createDirectly({
        status: "PAYED",
        orderId: generateId(),
        items: cartItems,
      })
      return orderService.createWithFondy({
        name: itemsNames,
        price: totalPrice,
        userId: user?.id || "",
        items: cartItems,
      })
    },
    onSuccess({ data }) {
      if (data.response) router.push(data.response.checkout_url)
      reset()
    },
    onError() {
      toast.error("Помилка при створенні платежу")
    },
  })

  return useMemo(
    () => ({
      createPayment,
      isLoadingCreate,
    }),
    [createPayment, isLoadingCreate],
  )
}
