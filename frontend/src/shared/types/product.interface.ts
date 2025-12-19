import { IReview } from "./review.interface"

export interface IProduct {
  id: string
  title: string
  description: string
  price: number
  photo: string
  subcategoryId: string
  subcategoryName: string
  compatibleCars: string[]
  attributes: [{ id: string; key: string; value: string }]
  reviews: IReview[]
  storeId: string
  createdAt: string
}

export interface IProductInput extends Omit<IProduct, "id" | "reviews" | "storeId" | "attributes" | "createdAt"> {
  compatibleCars: string[]
  attributes: { key: string; value: string }[]
}
