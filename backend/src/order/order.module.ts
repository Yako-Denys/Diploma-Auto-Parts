import { Module } from "@nestjs/common"

import { OrderService } from "./order.service"
import { PrismaService } from "src/prisma.service"
import { OrderController } from "./order.controller"

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
  exports: [OrderService],
})
export class OrderModule {}
