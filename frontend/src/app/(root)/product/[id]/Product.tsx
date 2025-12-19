"use client"

import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import { PUBLIC_URL } from "@/config/url.config"
import { formatPrice } from "@/utils/string/format-price"
import { Catalog } from "@/components/ui/catalog/Catalog"
import { productService } from "@/services/product.service"
import { IProduct } from "@/shared/types/product.interface"
import { FavoriteButton } from "./product-actions/FavoriteButton"
import { AddToCartButton } from "./product-actions/AddToCartButton"
import { ProductReviews } from "./product-reviews/ProductReviews"
import { getReviewWordWithEnding } from "@/utils/string/get-review-word-with-ending"

interface ProductProps {
  initialProduct: IProduct
  similarProducts: IProduct[]
  id?: string
}

export function Product({ initialProduct, similarProducts, id = "" }: ProductProps) {
  const { data: product } = useQuery({
    queryKey: ["product", initialProduct.id],
    queryFn: () => productService.getById(id),
    initialData: initialProduct,
    enabled: !!id,
  })

  const rating =
    Math.round(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length) || 0

  return (
    <div className="mx-auto max-w-7xl">
      <div className="space-y-7 px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Image
            width={600}
            height={600}
            src={product.photo}
            alt={product.title}
            className="object-cover rounded-lg mx-auto"
          />

          <div className="mt-10 space-y-5 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <div className="text-2xl">{formatPrice(product.price)}</div>

            <hr className="my-4" />

            <p className="text-muted-foreground text-sm">{product.description}</p>

            <hr className="my-4" />

            <div className="flex items-center gap-x-4">
              <h3 className="font-semibold">Категорія: </h3>
              <Link className="text-sm text-blue-600" href={PUBLIC_URL.category(product.subcategoryId)}>
                {product.subcategoryName}
              </Link>
            </div>

            <div className="flex items-center gap-x-4">
              <h3 className="font-semibold">Средній рейтинг: </h3>
              <div className="text-sm">
                ⭐ {rating.toFixed(1)} | {getReviewWordWithEnding(product.reviews.length)}
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex items-start gap-x-2">
              <AddToCartButton product={product} />
              <FavoriteButton product={product} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Характеристики:</h2>

        <ul className="">
          {product.attributes.map((att) => (
            <li key={att.key} className="text-sm flex justify-between py-2 odd:bg-muted px-2">
              <span className="font-bold">{att.key}</span>
              <span className="font-bold">{att.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold">Підходить для:</h2>

        <ul className="list-disc pl-5 pt-4 pb-10">
          {product.compatibleCars.map((car) => (
            <li key={car} className="text-sm text-muted-foreground">
              {car.replace("_", " ")}
            </li>
          ))}
        </ul>
      </div>

      <Catalog title="Схожі товари" products={similarProducts} />

      <br className="my-4" />

      <ProductReviews product={product} />
    </div>
  )
}
