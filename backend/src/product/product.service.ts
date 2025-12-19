import { Injectable, NotFoundException } from "@nestjs/common"

import { PrismaService } from "src/prisma.service"
import { CreateProductDto } from "./dto/create.product.dto"
import { UpdateProductDto } from "./dto/update.product.dto"

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm)
    return this.prisma.product.findMany({ orderBy: { createdAt: "desc" } })
  }

  private async getSearchTermFilter(searchTerm: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
    })
  }

  async getByStoreId(storeId: string) {
    return this.prisma.product.findMany({ where: { storeId } })
  }

  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { attributes: true, reviews: { include: { user: true } } },
    })
    if (!product) throw new NotFoundException("Товар не знайдено")
    return product
  }

  async getMostPopular() {
    const mostReviewedProducts = await this.prisma.review.groupBy({
      by: ["productId"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    })
    const productIds = mostReviewedProducts.map((item) => item.productId)
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    })
    const productsByPopularity = productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean)
    return productsByPopularity
  }

  async getSimilar(id: string) {
    const currentProduct = await this.getById(id)
    if (!currentProduct) throw new NotFoundException("Поточний товар не знайдений")
    const products = await this.prisma.product.findMany({
      where: { subcategoryId: currentProduct.subcategoryId, NOT: { id: currentProduct.id } },
      orderBy: { createdAt: "desc" },
    })
    return products
  }

  async getByCategoryId(id: string) {
    const products = await this.prisma.product.findMany({ where: { subcategoryId: id } })
    return products
  }

  async getByModelId(id: string) {
    const products = await this.prisma.product.findMany({ where: { compatibleCars: { hasSome: [id] } } })
    return products
  }

  async create(storeId: string, dto: CreateProductDto) {
    const { attributes, ...newProductDto } = dto
    const product = await this.prisma.product.create({ data: { ...newProductDto, storeId } })
    if (attributes && attributes.length) {
      const attributesData = attributes.map((attr) => ({
        key: attr.key,
        value: attr.value,
        productId: product.id,
      }))
      await this.prisma.attribute.createMany({ data: attributesData })
    }
    return product
  }

  async update(id: string, dto: UpdateProductDto) {
    const oldProduct = await this.getById(id)
    const { attributes, ...updateProductDto } = dto

    const existingIds = new Set(oldProduct.attributes.map((attr) => attr.id))
    const incomingIds = new Set(attributes.filter((a) => a.id).map((a) => a.id!))

    const toUpdate = attributes.filter((a) => a.id && existingIds.has(a.id))
    const toCreate = attributes.filter((a) => !a.id)
    const toDeleteIds = [...existingIds].filter((id) => !incomingIds.has(id))

    await Promise.all(
      toUpdate.map((attr) =>
        this.prisma.attribute.update({ where: { id: attr.id }, data: { key: attr.key, value: attr.value } }),
      ),
    )

    if (toCreate.length > 0) {
      const attributesData = toCreate.map((attr) => ({ key: attr.key, value: attr.value, productId: id }))
      await this.prisma.attribute.createMany({ data: attributesData })
    }

    if (toDeleteIds.length > 0) {
      await this.prisma.attribute.deleteMany({ where: { id: { in: toDeleteIds } } })
    }

    return this.prisma.product.update({ where: { id }, data: updateProductDto })
  }

  async delete(id: string) {
    await this.getById(id)
    return this.prisma.product.delete({ where: { id } })
  }
}
