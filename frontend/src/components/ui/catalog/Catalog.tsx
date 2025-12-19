import Link from "next/link"

import { ProductCard } from "./ProductCard"
import { CatalogFilter } from "./CatalogFilter"
import { IProduct } from "@/shared/types/product.interface"

interface Props {
  title: string
  link?: string
  linkTitle?: string
  description?: string
  showFilters?: boolean
  isFiltersExist?: boolean
  products: IProduct[]
}

const Catalog = ({ title, description, linkTitle, link, showFilters, isFiltersExist, products }: Props) => {
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="px-4 lg:max-w-full lg:px-0">
          <div className="flex items-start lg:items-center gap-4 flex-col lg:flex-row">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">{title}</h1>
            {isFiltersExist && (
              <Link href="/explorer" className=" text-sm font-medium text-blue-600 hover:text-blue-600/90 md:flex">
                Скинути фільтр
              </Link>
            )}
          </div>

          {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
        </div>

        {link && linkTitle && (
          <Link href={link} className="hidden text-sm font-medium text-blue-600 hover:text-blue-600/90 md:flex">
            {linkTitle}
          </Link>
        )}
      </div>

      {showFilters && <CatalogFilter />}

      <div className="flex items-center w-full">
        <div className="mt-2 w-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {products.length ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div>Нечого не знайдено</div>
          )}
        </div>
      </div>
    </div>
  )
}

export { Catalog }
