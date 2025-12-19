export interface IManufacture {
  manufacturerId: number
  brand: string
}

export interface ICarModel {
  modelId: number
  modelName: string
  modelYearFrom: string | null
  modelYearTo: string | null
}
