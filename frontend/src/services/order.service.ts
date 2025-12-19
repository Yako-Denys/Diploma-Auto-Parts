import { axiosWithAuth } from "@/api/api.interceptors"

export type PaymentResponse = {
  response: {
    checkout_url: string
    payment_id: string
    response_status: string
  }
}

type CreatePayment = {
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

class OrderService {
  async create(data: CreatePayment) {
    return axiosWithAuth.post<PaymentResponse>(`${process.env.SERVER_URL}/payment/create`, data)
  }
}

export const orderService = new OrderService()
