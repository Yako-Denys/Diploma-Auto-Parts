import { IsString } from "class-validator"

export class CreateStoreDto {
  @IsString({ message: "Назва обов'язкова" })
  title: string
}
