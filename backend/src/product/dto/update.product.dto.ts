import { Type } from "class-transformer"
import { ValidateNested, IsArray } from "class-validator"

import { CreateProductDto } from "./create.product.dto"
import { UpdateAttributeDto } from "src/attribute/dto/attribute.dto"

export class UpdateProductDto extends CreateProductDto {
  @IsArray({ message: "Атрибути мають бути у вигляді масиву" })
  @ValidateNested({ each: true })
  @Type(() => UpdateAttributeDto)
  attributes: UpdateAttributeDto[]
}
