import { API_URL } from "@/config/api.config"
import { IUser } from "@/shared/types/user.interface"
import { axiosWithAuth } from "@/api/api.interceptors"

class UserService {
  async getProfile() {
    const { data } = await axiosWithAuth.get<IUser>(API_URL.users("/profile"))
    return data
  }

  async toggleFavorite(productId: string) {
    return axiosWithAuth.patch<IUser>(API_URL.users(`/profile/favorites/${productId}`))
  }
}

export const userService = new UserService()
