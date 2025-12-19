import { API_URL } from "@/config/api.config"
import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors"
import { IProduct, IProductInput } from "@/shared/types/product.interface"

class ProductService {
  async getAll(searchTerm?: string | null) {
    const config = { params: searchTerm ? { searchTerm } : {} }
    const { data } = await axiosClassic.get<IProduct[]>(API_URL.products(), config)
    return data || []
  }

  async getByStoreId(id: string) {
    const { data } = await axiosWithAuth.get<IProduct[]>(API_URL.products(`/by-storeId/${id}`))
    return data || []
  }

  async getById(id: string) {
    const { data } = await axiosClassic.get<IProduct>(API_URL.products(`/by-id/${id}`))
    return data
  }

  async getMostPopular() {
    const { data } = await axiosClassic.get<IProduct[]>(API_URL.products(`/most-popular`))
    return data
  }

  async getSimilar(id: string) {
    const { data } = await axiosClassic.get<IProduct[]>(API_URL.products(`/similar/${id}`))
    return data
  }

  async getByCategory(categoryId: string) {
    const { data } = await axiosClassic.get<IProduct[]>(API_URL.products(`/by-category/${categoryId}`))
    return data
  }

  async getByModel(modelId: string) {
    const { data } = await axiosClassic.get<IProduct[]>(API_URL.products(`/by-model/${modelId}`))
    return data
  }

  async create(payload: IProductInput, storeId: string) {
    const { data } = await axiosWithAuth.post<IProduct[]>(API_URL.products(`/${storeId}`), payload)
    return data
  }

  async update(id: string, payload: IProductInput) {
    const { data } = await axiosWithAuth.put<IProduct>(API_URL.products(`/${id}`), payload)
    return data
  }

  async delete(id: string) {
    const { data } = await axiosWithAuth.delete<IProduct>(API_URL.products(`/${id}`))
    return data
  }
}

export const productService = new ProductService()