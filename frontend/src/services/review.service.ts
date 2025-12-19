import { API_URL } from "@/config/api.config"
import { axiosWithAuth } from "@/api/api.interceptors"
import { IReview, IReviewInput } from "@/shared/types/review.interface"

class ReviewService {
  async getByStoreId(id: string) {
    const { data } = await axiosWithAuth.get<IReview[]>(API_URL.reviews(`/by-storeId/${id}`))
    return data
  }

  async create(payload: IReviewInput, productId: string, storeId: string) {
    const { data } = await axiosWithAuth.post<IReview>(API_URL.reviews(`/${productId}/${storeId}`), payload)
    return data
  }

  async delete(id: string) {
    const { data } = await axiosWithAuth.delete<IReview>(API_URL.reviews(`/${id}`))
    return data
  }
}

export const reviewService = new ReviewService()
