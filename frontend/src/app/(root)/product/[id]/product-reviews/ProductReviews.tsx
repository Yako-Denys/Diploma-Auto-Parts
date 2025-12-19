import Image from "next/image"
import { Plus, Trash } from "lucide-react"
import { Rating } from "react-simple-star-rating"

import { useProfile } from "@/hooks/useProfile"
import { Button } from "@/components/ui/Button"
import { IProduct } from "@/shared/types/product.interface"
import { ReviewModal } from "@/components/ui/modals/ReviewModal"
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal"
import { useDeleteReview } from "@/hooks/queries/reviews/useDeleteReview"

interface ProductReviewsProps {
  product: IProduct
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const { user } = useProfile()

  const { deleteReview } = useDeleteReview()

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Відгуки</h1>
        {user && (
          <ReviewModal storeId={product.storeId}>
            <Button variant="ghost">
              <Plus className="size-4 mr-2" />
              Додати відгук
            </Button>
          </ReviewModal>
        )}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {product.reviews.length ? (
          product.reviews.map((review) => (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-4 font-medium">
                  <Image
                    width={40}
                    height={40}
                    alt={review.user.name}
                    className="rounded-full"
                    src={review.user.picture}
                  />
                  {review.user.name}
                </div>

                {review.user.id === user?.id && (
                  <ConfirmModal handleClick={() => deleteReview(review.id)}>
                    <button className="-mt-3 text-red-500">
                      <Trash className="size-5" />
                    </button>
                  </ConfirmModal>
                )}
              </div>

              <Rating
                readonly
                initialValue={review.rating}
                SVGstyle={{
                  display: "inline-block",
                }}
                size={18}
                allowFraction
                transition
              />
              <div className="text-sm text-muted-foreground mt-1">{review.text}</div>
            </div>
          ))
        ) : (
          <div className="mt-4">В цього товару немає відгуків</div>
        )}
      </div>
    </>
  )
}
