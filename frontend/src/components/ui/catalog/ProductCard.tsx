"use client"

import Link from "next/link"
import Image from "next/image"

import { PUBLIC_URL } from "@/config/url.config"
import { formatPrice } from "@/utils/string/format-price"
import { IProduct } from "@/shared/types/product.interface"
import { FavoriteButton } from "@/app/(root)/product/[id]/product-actions/FavoriteButton"
import { AddToCartButton } from "@/app/(root)/product/[id]/product-actions/AddToCartButton"

interface ProductCardProps {
  product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white w-[280px] hover:shadow-lg p-4 rounded-md">
      <div className="relative">
        <Link href={PUBLIC_URL.product(product.id)}>
          <Image
            width={300}
            height={300}
            src={product.photo}
            alt={product.title}
            className="rounded-lg h-full max-h-[160px] object-contain"
          />
        </Link>

        <FavoriteButton product={product} className="w-[50px] p-0 absolute top-0" />
      </div>

      <h3 className="mt-2 text-lg font-semibold text-blue-500 line-clamp-1">{product.title}</h3>

      <Link href={PUBLIC_URL.category(product.subcategoryId)} className="mt-1">
        {product.subcategoryName}
      </Link>

      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>

      <div className="flex justify-between items-center mt-2">
        <p className="mt-1 font-semibold text-lg text-gray-900">{formatPrice(product.price)}</p>

        <AddToCartButton isShort product={product} />
      </div>
    </div>
  )
}
