import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ProductReviewsProps {
  productId: string;
  reviews: Array<{
    id: string;
    rating: number;
    title: string | null;
    comment: string | null;
    createdAt: Date;
    user: {
      firstName: string | null;
      lastName: string | null;
      imageUrl: string | null;
    };
  }>;
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} ({reviews.length} review
              {reviews.length !== 1 ? "s" : ""})
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id}>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      src={review.user.imageUrl || undefined}
                      alt={`${review.user.firstName} ${review.user.lastName}`}
                    />
                    <AvatarFallback>
                      {review.user.firstName?.[0]}
                      {review.user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {review.user.firstName} {review.user.lastName}
                        </p>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {review.title && (
                      <p className="font-semibold">{review.title}</p>
                    )}
                    {review.comment && (
                      <p className="text-muted-foreground">{review.comment}</p>
                    )}
                  </div>
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
