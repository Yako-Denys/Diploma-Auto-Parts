"use client"

import Link from "next/link"
import { useState } from "react"
import { Grip as GripIcon, ChevronRight } from "lucide-react"

import { cn } from "@/utils/clsx"
import { Button } from "@/components/ui/Button"
import allCategories from "@/data/categories.json"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"

type SubcategoriesType = {
  [id: string]: {
    text: string
    children: SubcategoriesType
  }
}

const categories = allCategories.type_1.categories

export function HeaderCatalog() {
  const [open, setOpen] = useState(false)

  const [activeCategoryId, setActiveCategoryId] = useState<string>("")
  const [subcategories, setSubcategories] = useState<SubcategoriesType | null>(null)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button variant="primary">
          <GripIcon className="size-4 mr-2" />
          Каталог
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-full gap-4 max-h-[calc(100vh-100px)]" align="start">
        <div className="w-[300px] flex flex-col max-h-full overflow-auto">
          {Object.entries(categories).map(([key, value]) => {
            const isActive = activeCategoryId === key

            return (
              <div
                key={key}
                className={cn(
                  "p-4 rounded-md hover:bg-muted cursor-pointer flex justify-between items-center",
                  isActive ? "bg-muted" : "",
                )}
                onMouseOver={() => {
                  setActiveCategoryId(key)
                  setSubcategories(value.children as unknown as SubcategoriesType)
                }}
              >
                {value.text} <ChevronRight className="min-w-[24px]" />
              </div>
            )
          })}
        </div>
        <div className="pr-10 min-w-80 max-h-full overflow-auto">
          {subcategories &&
            Object.entries(subcategories).map(([key, value]) => {
              return (
                <div key={key} className="mb-6">
                  <Link
                    onClick={() => setOpen(false)}
                    href={`/explorer/category/${key}`}
                    className="block font-bold mb-2 hover:text-blue-500"
                  >
                    <h4>{value.text}</h4>
                  </Link>

                  {!!Object.keys(value.children).length && (
                    <ul>
                      {Object.entries(value.children).map(([key, value]) => (
                        <li
                          key={key}
                          onClick={() => setOpen(false)}
                          className="hover:text-blue-500 font-normal mb-1 text-sm"
                        >
                          <Link href={`/explorer/category/${key}`}>{value.text}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
