import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"

import { CreateAttributeDto } from "src/attribute/dto/attribute.dto"

export class CreateProductDto {
  @IsString({ message: "Назва обов'язкова" })
  @IsNotEmpty({ message: "Назва не може бути пустою" })
  title: string

  @IsString({ message: "Опис обов'язковий" })
  @IsNotEmpty({ message: "Опис не може бути пустим" })
  description: string

  @IsNumber({}, { message: "Ціна повинна бути числом" })
  @IsNotEmpty({ message: "Ціна не може бути пустою" })
  price: number

  @IsString({ message: "Фото товару обов'язкове" })
  @IsNotEmpty({ message: "Фото товару не може бути пустим" })
  photo: string

  @IsNotEmpty({ message: "ID категорії не може бути пустим" })
  subcategoryId: string

  @IsString({ message: "Назва категорії обов'язкова" })
  @IsNotEmpty({ message: "Назва категорії не може бути пустою" })
  subcategoryName: string

  @IsString({ message: "Вкажіть хотя б одну модель автомобіля", each: true })
  @ArrayMinSize(1, { message: "Повинна бути хоча б одна модель автомобіля" })
  @IsNotEmpty({ message: "Модель автомобіля не може бути пустою", each: true })
  compatibleCars: string[]

  @IsArray({ message: "Атрибути мають бути у вигляді масиву" })
  @ArrayMinSize(1, { message: "Має бути щонайменше один атрибут" })
  @ValidateNested({ each: true })
  @Type(() => CreateAttributeDto)
  attributes: CreateAttributeDto[]
}
