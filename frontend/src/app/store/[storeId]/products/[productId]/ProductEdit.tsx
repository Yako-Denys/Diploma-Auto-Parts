"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { ProductForm } from "../ProductForm"
import { productService } from "@/services/product.service"
import { useGetCategories } from "@/hooks/queries/categories/useGetCategories"

export function ProductEdit() {
  const params = useParams<{ productId: string }>()

  const { data } = useQuery({
    queryKey: ["get product"],
    queryFn: () => productService.getById(params.productId),
  })

  const { categories } = useGetCategories()

  return <ProductForm product={data} categories={categories || []} />
}
