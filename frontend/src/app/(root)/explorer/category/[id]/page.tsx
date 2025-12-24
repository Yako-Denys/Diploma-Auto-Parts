import { notFound } from "next/navigation"

import allCategories from "@/data/categories.json"
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
    const products = await productService.getByCategory(params.id)

    return { products }
  } catch {
    return notFound()
  }
}
export function flattenCategories(categories: any) {
  const result: any = []

  function traverse(nodes: any) {
    for (const [id, node_] of Object.entries(nodes)) {
      const node = node_ as any
      result.push({
        id,
        text: node.text,
      })

      if (node.children && typeof node.children === "object" && Object.keys(node.children).length > 0) {
        traverse(node.children)
      }
    }
  }

  traverse(categories)

  return result
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { products } = await getProducts(params)
  const decodedId = decodeURIComponent(params.id)

  const categories = allCategories.type_1.categories
  const currentCategory = flattenCategories(categories).find((c: any) => c.id === decodedId)

  return (
    <div className="my-6">
      <Catalog
        showFilters
        products={products}
        title={`Товари категорії: ${currentCategory ? currentCategory.text : decodedId}`}
      />
    </div>
  )
}
