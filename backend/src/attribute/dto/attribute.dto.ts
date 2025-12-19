import { IsNotEmpty, IsString } from "class-validator"

export class AttributeDto {
  @IsString({ message: "Ключ атрибуту має бути рядком" })
  @IsNotEmpty({ message: "Ключ атрибуту не може бути пустим" })
  key: string

  @IsString({ message: "Значення атрибуту має бути рядком" })
  @IsNotEmpty({ message: "Значення атрибуту не може бути пустим" })
  value: string
}

export class CreateAttributeDto extends AttributeDto {}

export class UpdateAttributeDto extends AttributeDto {
  @IsNotEmpty({ message: "ID атрибуту обов’язковий для оновлення" })
  id: string
}
