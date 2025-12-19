"use client"

import Link from "next/link"
import { useState } from "react"

import { cn } from "@/utils/clsx"
import manufactures from "@/data/manufactures.json"
import { useFetchCarModels } from "@/hooks/useFetchCarModels"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs"
import { ICarModel, IManufacture } from "@/shared/types/filter.interface"

const years = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => 1980 + i)

interface Props {}

export function CatalogFilter({}: Props) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedModel, setSelectedModel] = useState<ICarModel | null>(null)
  const [selectedManufacture, setSelectedManufacture] = useState<IManufacture | null>(null)

  const models = useFetchCarModels(selectedManufacture, selectedYear)

  return (
    <div className="my-10">
      <Tabs defaultValue="manufactures" className="w-full gap-0">
        <div className="flex justify-center">
          <TabsList className="py-2 h-auto flex-col md:flex-row w-full">
            <TabsTrigger value="manufactures" className="p-4 md:max-w-[300px] w-full md:w-auto text-left text-base">
              {selectedManufacture ? `Марка: ${selectedManufacture.brand}` : "Виберіть марку"}
            </TabsTrigger>

            <TabsTrigger
              value="year"
              className="p-4 md:max-w-[300px] w-full md:w-auto text-left text-base"
              disabled={!selectedManufacture}
            >
              {selectedYear ? `Рік: ${selectedYear}` : "Виберіть рік"}
            </TabsTrigger>

            <TabsTrigger
              value="model"
              className="p-4 md:max-w-[300px] w-full md:w-auto text-left text-base"
              disabled={!selectedManufacture || !selectedYear}
            >
              {selectedModel ? `${selectedModel.modelName.replaceAll("_", " ")}` : "Виберіть модель"}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="manufactures">
          <div className="flex flex-wrap border-r border-t">
            {manufactures.manufacturers.map((el) => {
              const isSelected = el.manufacturerId === selectedManufacture?.manufacturerId
              return (
                <div
                  key={el.manufacturerId}
                  onClick={() => setSelectedManufacture(el)}
                  className={cn(
                    isSelected ? "bg-muted" : "",
                    "min-w-[160px] min-h-[60px] border-b border-l p-4 text-center flex-1 cursor-pointer",
                  )}
                >
                  {el.brand}
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="year">
          <div className="flex flex-wrap border-r border-t">
            {years.map((el) => {
              const isSelected = el === selectedYear
              return (
                <div
                  key={el}
                  onClick={() => setSelectedYear(el)}
                  className={cn(
                    isSelected ? "bg-muted" : "",
                    "min-w-[160px] min-h-[60px] border-b border-l p-4 text-center flex-1 cursor-pointer",
                  )}
                >
                  {el}
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="model">
          <div className="flex flex-wrap border-r border-t">
            {(models || []).map((el) => {
              const isSelected = el.modelId === selectedModel?.modelId
              return (
                <Link
                  key={el.modelId}
                  href={`/explorer/model/${el.modelName.replaceAll("/", "__")}`}
                  className={cn(
                    isSelected ? "bg-muted" : "",
                    "min-w-[160px] min-h-[60px] border-b border-l p-4 text-center flex-1 cursor-pointer",
                  )}
                  onClick={() => setSelectedModel(el)}
                >
                  {selectedManufacture && selectedManufacture.brand} {el.modelName}
                </Link>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
