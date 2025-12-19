import { Injectable } from "@nestjs/common"
import { EnumOrderStatus } from "@prisma/client"

import { OrderDto } from "./dto/order.dto"
import { PrismaService } from "src/prisma.service"
import { PaymentStatusDto } from "./dto/payment-status.dto"

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      product: { connect: { id: item.productId } },
      store: { connect: { id: item.storeId } },
    }))

    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    const order = await this.prisma.order.create({
      data: {
        orderId: dto.orderId,
        status: dto.status,
        items: { create: orderItems },
        total,
        user: { connect: { id: userId } },
      },
    })

    return order
  }

  async updateStatus(dto: PaymentStatusDto) {
    if (dto.event === "payment.waiting_for_capture") {
      const capturePayment = {
        amount: { value: dto.object.amount.value, currency: dto.object.amount.currency },
      }
    }

    if (dto.event === "payment.succeeded") {
      const orderId = dto.object.description.split("#")[1]

      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: EnumOrderStatus.PAYED },
      })

      return true
    }

    return true
  }

  async checkIsExist(orderId: string): Promise<boolean> {
    const order = await this.prisma.order.findFirst({ where: { orderId } })
    if (order) {
      return true
    }
    return false
  }
}
