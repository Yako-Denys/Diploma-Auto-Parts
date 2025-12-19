import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { AttributeService } from './attribute.service'
import { AttributeController } from './attribute.controller'

@Module({
  controllers: [AttributeController],
  providers: [AttributeService, PrismaService],
})
export class AttributeModule {}
