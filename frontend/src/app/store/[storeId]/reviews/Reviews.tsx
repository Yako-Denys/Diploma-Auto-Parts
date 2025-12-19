"use client"

import { Heading } from "@/components/ui/Heading"
import { formatDate } from "@/utils/date/format-date"
import { IReviewColumn, reviewColumns } from "./ReviewColumns"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { useGetReviews } from "@/hooks/queries/reviews/useGetReviews"
import DataTableLoading from "@/components/ui/data-table/DataTableLoading"

export function Reviews() {
  const { reviews, isLoading } = useGetReviews()

  const formattedReviews: IReviewColumn[] = reviews
    ? reviews.map((review) => ({
        id: review.id,
        createdAt: formatDate(review.createdAt),
        rating: Array.from({ length: review.rating })
          .map(() => "⭐️")
          .join(" "),
        username: review.user.name,
      }))
    : []

  return (
    <div className="p-6">
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Heading title={`Відгуки (${reviews?.length})`} description="Всі відгуки в вашому магазині" />
          </div>
          <div className="mt-3">
            <DataTable columns={reviewColumns} data={formattedReviews} />
          </div>
        </>
      )}
    </div>
  )
}
