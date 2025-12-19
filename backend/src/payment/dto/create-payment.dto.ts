class OrderItems {
  quantity: number
  price: number
  productId: string
}

export class CreatePaymentDto {
  name: string
  price: number
  userId: string
  items: OrderItems[]
}
