import {
  Get,
  Put,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UsePipes,
  HttpCode,
  Controller,
  ValidationPipe,
} from "@nestjs/common"

import { ProductService } from "./product.service"
import { Auth } from "src/auth/decorators/auth.decorator"
import { CreateProductDto } from "./dto/create.product.dto"
import { UpdateProductDto } from "./dto/update.product.dto"

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(@Query("searchTerm") searchTerm?: string) {
    return this.productService.getAll(searchTerm)
  }

  @Auth()
  @Get("by-storeId/:storeId")
  async getByStoreId(@Param("storeId") storeId: string) {
    return this.productService.getByStoreId(storeId)
  }

  @Get("by-id/:id")
  async getById(@Param("id") id: string) {
    return this.productService.getById(id)
  }

  @Get("most-popular")
  async getMostPopular() {
    return this.productService.getMostPopular()
  }

  @Get("similar/:id")
  async getSimilar(@Param("id") id: string) {
    return this.productService.getSimilar(id)
  }

  @Get("by-category/:id")
  async getByCategoryId(@Param("id") id: string) {
    return this.productService.getByCategoryId(id)
  }

  @Get("by-model/:id")
  async getByModelId(@Param("id") id: string) {
    return this.productService.getByModelId(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(":storeId")
  async create(@Param("storeId") storeId: string, @Body() dto: CreateProductDto) {
    return this.productService.create(storeId, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto)
  }

  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.productService.delete(id)
  }
}
