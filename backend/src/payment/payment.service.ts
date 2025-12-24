import * as crypto from "crypto"
import { Injectable } from "@nestjs/common"
import { EnumOrderStatus } from "@prisma/client"

import { OrderService } from "../order/order.service"
import { CreatePaymentDto } from "./dto/create-payment.dto"
import { CreateOrderDto } from "src/order/dto/create-order.dto"
import { FondyCallbackResponseDto } from "./dto/fondy-callback-response.dto"

@Injectable()
export class PaymentService {
  constructor(private readonly orderService: OrderService) {}

  async createPayment(dto: CreatePaymentDto) {
    const FONDY_MERCHANT_ID = process.env.FONDY_MERCHANT_ID
    const FONDY_MERCHANT_PASSWORD = process.env.FONDY_MERCHANT_PASSWORD
    const CLIENT_URL = process.env.CLIENT_URL
    const SERVER_URL = process.env.SERVER_URL
    const NGROCK_FORWARDING_URL = process.env.NGROCK_FORWARDING_URL
    const ENVIRONMENT = process.env.ENVIRONMENT

    const BASE_URL = ENVIRONMENT === "development" ? NGROCK_FORWARDING_URL : SERVER_URL

    const orderedItemsString = JSON.stringify(dto.items)
    const order_id = `name=${dto.name}//price=${dto.price}//userId=${dto.userId}//items=${orderedItemsString}//createdAt=${Date.now()}`

    const orderBody = {
      response_url: `${CLIENT_URL}/`,
      server_callback_url: `${BASE_URL}/payment/confirmation`,
      order_id: order_id,
      merchant_id: FONDY_MERCHANT_ID,
      order_desc: dto.name,
      amount: dto.price * 100,
      currency: "UAH",
    }

    const orderKeys = Object.keys(orderBody).sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })

    const signatureRaw = orderKeys.map((v) => orderBody[v]).join("|")
    const signature = crypto.createHash("sha1")

    signature.update(`${FONDY_MERCHANT_PASSWORD}|${signatureRaw}`)

    const json = JSON.stringify({
      request: {
        ...orderBody,
        signature: signature.digest("hex"),
      },
    })

    const response = await fetch("https://pay.fondy.eu/api/checkout/url/", {
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    const data = await response.json()

    return data
  }

  checkSignature(dto: FondyCallbackResponseDto): boolean {
    const FONDY_MARCHANT_PASSWORD = process.env.FONDY_MERCHANT_PASSWORD

    const orderedKeys = Object.keys(dto).sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
    const signatureValues = orderedKeys.filter(
      (key) => dto[key] !== "" && dto[key] !== dto.response_signature_string && dto[key] !== dto.signature,
    )

    const signatureRaw = signatureValues.map((v) => dto[v]).join("|")
    const signature = crypto.createHash("sha1")
    signature.update(`${FONDY_MARCHANT_PASSWORD}|${signatureRaw}`)

    const signatureHex = signature.digest("hex")

    if (signatureHex === dto.signature) {
      return true
    }

    return false
  }

  async confirmPayment(dto: FondyCallbackResponseDto) {
    try {
      const isCurrentPayment = this.checkSignature(dto)

      let userId = ""

      if (dto.order_status === "approved" && isCurrentPayment) {
        const ordersFieldsArray = dto.order_id.split("//").map((el: string) => {
          const substr = el.split("=")

          if (substr[0] === "userId") userId = substr[1]

          if (substr[0] === "price") {
            return { [substr[0]]: Number(substr[1]) }
          } else if (substr[0] === "items") {
            return { [substr[0]]: JSON.parse(substr[1]) }
          } else {
            return { [substr[0]]: substr[1] }
          }
        })

        const orderData: CreateOrderDto = ordersFieldsArray.reduce(
          (obj, item) => {
            const key = Object.keys(item)[0]
            if (key && typeof item[key] !== "undefined") {
              obj[key] = item[key]
            }
            return obj
          },
          { status: EnumOrderStatus.PAYED, orderId: "", items: [] } as CreateOrderDto,
        )

        const isOrderExist = await this.orderService.checkIsExist(dto.order_id)

        if (!isOrderExist && userId) {
          const order = await this.orderService.create(orderData, userId)
          return order
        }
      }
    } catch (error) {
      throw new Error("Сталась помилка з платіжним сервісом. Спробуйте пізніше")
    }
  }
}
