import { Body, Controller, Post } from "@nestjs/common"

import { PaymentService } from "./payment.service"
import { Auth } from "src/auth/decorators/auth.decorator"
import { CreatePaymentDto } from "./dto/create-payment.dto"
import { CurrentUser } from "src/user/decorators/user.decorator"
import { FondyCallbackResponseDto } from "./dto/fondy-callback-response.dto"

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Auth()
  @Post("/create")
  paymentHandler(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto)
  }

  @Auth()
  @Post("/confirmation")
  async paymentConfirmation(@Body() dto: FondyCallbackResponseDto, @CurrentUser("id") userId: string) {
    return this.paymentService.confirmPayment(dto, userId)
  }
}
