import { API_URL } from "@/config/api.config"
import { axiosWithAuth } from "@/api/api.interceptors"
import { IMainStatistics, IMiddleStatistics } from "@/shared/types/statistics.interface"

class StatisticsService {
  async getMain(storeId: string) {
    const { data } = await axiosWithAuth.get<IMainStatistics[]>(API_URL.statistics(`/main/${storeId}`))
    return data
  }

  async getMiddle(storeId: string) {
    const { data } = await axiosWithAuth.get<IMiddleStatistics>(API_URL.statistics(`/middle/${storeId}`))
    return data
  }
}

export const statisticsService = new StatisticsService()
