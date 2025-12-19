import { useMemo } from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { productService } from "@/services/product.service"

export const useGetProducts = () => {
  const params = useParams<{ storeId: string }>()

  const { data: products, isLoading } = useQuery({
    queryKey: ["get products for store dashboard"],
    queryFn: () => productService.getByStoreId(params.storeId),
  })

  return useMemo(() => ({ products, isLoading }), [products, isLoading])
}
