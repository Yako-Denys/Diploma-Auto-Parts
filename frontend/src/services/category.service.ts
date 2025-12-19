import { API_URL } from "@/config/api.config"
import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors"
import { ICategory, ICategoryInput } from "@/shared/types/category.interface"

class CategoryService {
  async getByStoreId(id: string) {
    const { data } = await axiosWithAuth.get<ICategory[]>(API_URL.categories(`/by-storeId/${id}`))
    return data
  }

  async getById(id: string) {
    const { data } = await axiosClassic.get<ICategory>(API_URL.categories(`/by-id/${id}`))
    return data
  }

  async create(payload: ICategoryInput, storeId: string) {
    const { data } = await axiosWithAuth.post<ICategory>(API_URL.categories(`/${storeId}`), payload)
    return data
  }

  async update(id: string, payload: ICategoryInput) {
    const { data } = await axiosWithAuth.put<ICategory>(API_URL.categories(`/${id}`), payload)
    return data
  }

  async delete(id: string) {
    const { data } = await axiosWithAuth.delete<ICategory>(API_URL.categories(`/${id}`))
    return data
  }
}

export const categoryService = new CategoryService()
