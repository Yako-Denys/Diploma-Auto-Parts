import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config"

import { AuthService } from "./auth.service"
import { UserModule } from "src/user/user.module"
import { PrismaService } from "src/prisma.service"
import { AuthController } from "./auth.controller"
import { UserService } from "src/user/user.service"
import { getJwtConfig } from "src/config/jwt.config"
import { JwtStrategy } from "./strategies/jwt.strategy"

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
