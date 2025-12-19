import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string

  @IsString({ message: "Почта обов'язкова" })
  @IsEmail()
  email: string

  @MinLength(6, { message: "Пароль повинен складатись не менше ніж з 6 символів!" })
  @IsString({ message: "Пароль обов'язковий" })
  password: string
}


