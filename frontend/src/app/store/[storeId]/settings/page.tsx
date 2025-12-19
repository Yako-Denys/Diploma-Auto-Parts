import type { Metadata } from "next"

import { Settings } from "./Settings"
import { NO_INDEX_PAGE } from "@/constants/seo.constants"

export const metadata: Metadata = {
  title: "Налаштування магазина",
  ...NO_INDEX_PAGE,
}

export default function SettingsPage() {
  return <Settings />
}
