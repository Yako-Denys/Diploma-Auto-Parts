"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/Button"
import { STORE_URL } from "@/config/url.config"
import { Heading } from "@/components/ui/Heading"
import { formatDate } from "@/utils/date/format-date"
import { formatPrice } from "@/utils/string/format-price"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { IProductColumn, productColumns } from "./ProductColumns"
import { useGetProducts } from "@/hooks/queries/products/useGetProducts"
import DataTableLoading from "@/components/ui/data-table/DataTableLoading"

export function Products() {
  const params = useParams<{ storeId: string }>()

  const { products, isLoading } = useGetProducts()

  const formattedProducts: IProductColumn[] = products
    ? products.map((product) => ({
        id: product.id,
        title: product.title,
        price: formatPrice(product.price),
        subcategoryId: product.subcategoryId,
        subcategoryName: product.subcategoryName,
        storeId: product.storeId,
        createdAt: formatDate(product.createdAt),
      }))
    : []

  return (
    <div className="p-6">
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Heading title={`Товари (${products ? products.length : 0})`} description="Всі товари вашого магазина" />

            <div className="flex items-center gap-x-4">
              <Link href={STORE_URL.productCreate(params.storeId)}>
                <Button variant="primary">
                  <Plus className="size-4 mr-2" />
                  Створити
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-3">
            <DataTable columns={productColumns} data={formattedProducts} filterKey="title" />
          </div>
        </>
      )}
    </div>
  )
}
