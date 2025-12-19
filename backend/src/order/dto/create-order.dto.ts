import { EnumOrderStatus } from "@prisma/client"

export class CreateOrderDto {
  status: EnumOrderStatus
  orderId: string
  items: OrderItemDto[]
}

class OrderItemDto {
  quantity: number
  price: number
  productId: string
  storeId: string
}
