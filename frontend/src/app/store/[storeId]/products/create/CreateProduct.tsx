"use client"

import { ProductForm } from "../ProductForm"
import { useGetCategories } from "@/hooks/queries/categories/useGetCategories"

export function CreateProduct() {
  const { categories } = useGetCategories()

  return <ProductForm categories={categories || []} />
}
