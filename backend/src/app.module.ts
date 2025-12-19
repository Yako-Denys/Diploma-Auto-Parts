import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { AuthModule } from "./auth/auth.module"
import { FileModule } from "./file/file.module"
import { UserModule } from "./user/user.module"
import { StoreModule } from "./store/store.module"
import { OrderModule } from "./order/order.module"
import { ReviewModule } from "./review/review.module"
import { ProductModule } from "./product/product.module"
import { PaymentModule } from "./payment/payment.module"
import { AttributeModule } from "./attribute/attribute.module"
import { StatisticsModule } from "./statistics/statistics.module"

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    FileModule,
    StoreModule,
    OrderModule,
    ReviewModule,
    ProductModule,
    PaymentModule,
    AttributeModule,
    StatisticsModule,
  ],
})
export class AppModule {}
