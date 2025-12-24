import { axiosWithAuth } from "@/api/api.interceptors"

export type PaymentResponse = {
  response: {
    checkout_url: string
    payment_id: string
    response_status: string
  }
}

type CreateWithFondyPayment = {
  name: string
  price: number
  userId: string
  items: {
    price: number
    quantity: number
    productId: string
    storeId: string
  }[]
}
type CreateDirectlyPayment = {
  status: string
  orderId: string
  items: {
    price: number
    quantity: number
    productId: string
    storeId: string
  }[]
}

class OrderService {
  async createWithFondy(data: CreateWithFondyPayment) {
    return axiosWithAuth.post<PaymentResponse>(`${process.env.SERVER_URL}/payment/create`, data)
  }

  async createDirectly(data: CreateDirectlyPayment) {
    return axiosWithAuth.post<PaymentResponse>(`${process.env.SERVER_URL}/orders/place`, data)
  }
}

export const orderService = new OrderService()
