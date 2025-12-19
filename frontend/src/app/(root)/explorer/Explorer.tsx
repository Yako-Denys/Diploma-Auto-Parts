"use client"

import { useSearchParams } from "next/navigation"

import { useQuery } from "@tanstack/react-query"
import { Catalog } from "@/components/ui/catalog/Catalog"
import { productService } from "@/services/product.service"
import { IProduct } from "@/shared/types/product.interface"

interface Props {
  products: IProduct[]
}

export function Explorer({ products }: Props) {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("searchTerm")

  const { data } = useQuery({
    queryKey: ["product explorer", searchTerm],
    queryFn: () => productService.getAll(searchTerm),
    initialData: products,
  })

  return (
    <div className="my-6">
      <Catalog
        showFilters
        products={data}
        title={searchTerm ? `Пошук за запитом "${searchTerm}"` : "Каталог товарів"}
      />
    </div>
  )
}
