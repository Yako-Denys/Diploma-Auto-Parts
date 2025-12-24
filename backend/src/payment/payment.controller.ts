import { Body, Controller, Post } from "@nestjs/common"

import { PaymentService } from "./payment.service"
import { Auth } from "src/auth/decorators/auth.decorator"
import { CreatePaymentDto } from "./dto/create-payment.dto"
import { FondyCallbackResponseDto } from "./dto/fondy-callback-response.dto"

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Auth()
  @Post("/create")
  paymentHandler(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto)
  }

  @Post("/confirmation")
  async paymentConfirmation(@Body() dto: FondyCallbackResponseDto) {
    return this.paymentService.confirmPayment(dto)
  }
}
