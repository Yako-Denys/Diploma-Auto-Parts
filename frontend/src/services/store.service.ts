import { API_URL } from "@/config/api.config"
import { axiosWithAuth } from "@/api/api.interceptors"
import { IStore, IStoreCreate, IStoreEdit } from "@/shared/types/store.interface"

class StoreService {
  async getById(id: string) {
    const { data } = await axiosWithAuth.get<IStore>(API_URL.stores(`/by-id/${id}`))
    return data
  }

  async create(payload: IStoreCreate) {
    const { data } = await axiosWithAuth.post<IStore>(API_URL.stores(""), payload)
    return data
  }

  async update(id: string, payload: IStoreEdit) {
    const { data } = await axiosWithAuth.put<IStore>(API_URL.stores(`/${id}`), payload)
    return data
  }

  async delete(id: string) {
    const { data } = await axiosWithAuth.delete<IStore>(API_URL.stores(`/${id}`))
    return data
  }
}

export const storeService = new StoreService()
