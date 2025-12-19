import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { AttributeDto } from './dto/attribute.dto'

@Injectable()
export class AttributeService {
  constructor(private prisma: PrismaService) {}

  // async getById(id: string) {
  //   const attribute = await this.prisma.attribute.findUnique({ where: { id } })
  //   if (!attribute) throw new NotFoundException('Цвет не найден')
  //   return attribute
  // }

  // async create(productId: string, dto: AttributeDto) {
  //   return this.prisma.attribute.create({ data: { key: dto.key, value: dto.value, productId } })
  // }

  // async update(id: string, dto: AttributeDto) {
  //   await this.getById(id)
  //   return this.prisma.attribute.update({ where: { id }, data: dto })
  // }

  // async delete(id: string) {
  //   await this.getById(id)
  //   return this.prisma.attribute.delete({ where: { id } })
  // }
}
