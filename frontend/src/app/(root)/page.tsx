import type { Metadata } from "next"

import { Home } from "./Home"
import { productService } from "@/services/product.service"

export const metadata: Metadata = {
  title: "Все необхідне для вашого авто - в одному місці!",
}

export const revalidate = 60

async function getProducts() {
  const mostPopular = (await productService.getMostPopular()).slice(0, 6)
  const newest = (await productService.getAll()).slice(-5)

  return { mostPopular, newest }
}

export default async function HomePage() {
  const data = await getProducts()
  return <Home mostPopular={data.mostPopular || []} newest={data.newest || []} />
}
