import { Put, Body, Post, Param, Delete, UsePipes, HttpCode, Controller, ValidationPipe } from "@nestjs/common"

import { AttributeDto } from "./dto/attribute.dto"
import { AttributeService } from "./attribute.service"
import { Auth } from "src/auth/decorators/auth.decorator"

@Controller("attributes")
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}
  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Auth()
  // @Post(':productId')
  // async create(@Param('productId') productId: string, @Body() dto: AttributeDto) {
  //   return this.attributeService.create(productId, dto)
  // }

  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Auth()
  // @Put(':id')
  // async update(@Param('id') id: string, @Body() dto: AttributeDto) {
  //   return this.attributeService.update(id, dto)
  // }

  // @HttpCode(200)
  // @Auth()
  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.attributeService.delete(id)
  // }
}
