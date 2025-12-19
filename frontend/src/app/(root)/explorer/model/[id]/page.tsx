import { notFound } from "next/navigation"

import { Catalog } from "@/components/ui/catalog/Catalog"
import { productService } from "@/services/product.service"

export const revalidate = 60

export async function generateStaticParams() {
  const products = await productService.getAll()

  const paths = products.map((product) => {
    return {
      params: { id: product.id },
    }
  })

  return paths
}

async function getProducts(params: { id: string }) {
  try {
    const products = await productService.getByModel(params.id)

    return { products }
  } catch {
    return notFound()
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { products } = await getProducts(params)
  const decodedId = decodeURIComponent(params.id).replaceAll("_", "")

  return (
    <div className="my-6">
      <Catalog title={`Деталі сумісні з: ${decodedId}`} products={products} isFiltersExist={!!decodedId} showFilters />
    </div>
  )
}
