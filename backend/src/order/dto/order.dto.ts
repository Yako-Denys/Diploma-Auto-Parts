import { Type } from "class-transformer"
import { EnumOrderStatus } from "@prisma/client"
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"

export class OrderDto {
  @IsOptional()
  @IsEnum(EnumOrderStatus, { message: "Статус замовлення обов'язковий" })
  status: EnumOrderStatus

  @IsString({ message: "ID замовлення повинно бути рядком" })
  orderId: string

  @IsArray({ message: "В замовленні немає жодного товару" })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[]
}

export class OrderItemDto {
  @IsNumber({}, { message: "Кількість повинна бути числом" })
  quantity: number

  @IsNumber({}, { message: "Ціна повинна бути числом" })
  price: number

  @IsString({ message: "ID продукту повинен бути рядком" })
  productId: string

  @IsString({ message: "ID магазину повинен бути рядком" })
  storeId: string
}
