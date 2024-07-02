'use client';

import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getAllReview } from '@/actions/actions';
import Autoplay from 'embla-carousel-autoplay';

interface Review {
  id: number;
  star_rating: number;
  comment: string;
  user_fullname: string;
}

export default function HomeReview() {
  const [reviews, setReviews] = useState<Review[] | undefined>([]);

  useEffect(() => {
    async function fetchReviews() {
      const result = await getAllReview();
      if (result.success) {
        setReviews(result.data);
      } else {
        console.error(result.message);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div className="max-w-screen-md mx-auto">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="flex gap-3">
          {reviews?.map((review) => (
            <CarouselItem key={review.id} className="grid gap-3 md:basis-1/2 basis-full border border-gray-200 rounded-lg bg-white">
              <p className="text-xl font-semibold">{review.user_fullname}</p>
              <p className="font-semibold text-zinc-500">Star : {review.star_rating}</p>
              <p className="text-sm text-zinc-500">"{review.comment}"</p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
