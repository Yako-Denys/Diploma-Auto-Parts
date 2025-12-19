import type { Metadata } from "next"

import { Products } from "./Products"
import { NO_INDEX_PAGE } from "@/constants/seo.constants"

export const metadata: Metadata = {
  title: "Товари",
  ...NO_INDEX_PAGE,
}

export default function ProductsPage() {
  return <Products />
}
