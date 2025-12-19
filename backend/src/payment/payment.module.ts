import { Module } from "@nestjs/common"

import { AuthModule } from "src/auth/auth.module"
import { PaymentService } from "./payment.service"
import { OrderModule } from "../order/order.module"
import { PaymentController } from "./payment.controller"

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [OrderModule, AuthModule],
})
export class PaymentModule {}
