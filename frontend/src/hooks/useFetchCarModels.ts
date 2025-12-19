import { useEffect, useState } from "react"

import { ICarModel, IManufacture } from "@/shared/types/filter.interface"

export function filterModelsByYear(models: ICarModel[], selectedYear: number): ICarModel[] {
  return models.filter((model) => {
    const from = model.modelYearFrom ? parseInt(model.modelYearFrom) : null
    const to = model.modelYearTo ? parseInt(model.modelYearTo) : null

    // Якщо обидва роки відсутні — не включати модель
    if (from === null && to === null) return false

    // Якщо тільки верхня межа (до) задана
    if (from === null && to !== null) return selectedYear <= to

    // Якщо тільки нижня межа (з) задана
    if (from !== null && to === null) return selectedYear >= from

    // Якщо обидві межі задані
    return selectedYear >= (from as number) && selectedYear <= (to as number)
  })
}

const useFetchCarModels = (selectedManufacture: IManufacture | null, selectedYear?: number | null) => {
  const [models, setModels] = useState<ICarModel[] | null>(null)

  useEffect(() => {
    if (!selectedManufacture) return
    ;(async function () {
      const brandId = selectedManufacture.manufacturerId
      const brandName = selectedManufacture.brand

      const res = await fetch(`/data/car-models/${brandName}_${brandId}.json`)
      const data = await res.json()

      if (!selectedYear) {
        setModels(data.models)
        return
      }

      const models = filterModelsByYear(data.models, selectedYear)
      setModels(models)
    })()
  }, [selectedYear, selectedManufacture])

  return models
}

export { useFetchCarModels }
