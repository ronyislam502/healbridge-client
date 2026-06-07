import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/Icons";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface DoctorReviewsProps {
  reviews: any[];
}

const DoctorReviews = ({ reviews }: DoctorReviewsProps) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Patient Reviews</h3>
        <span className="px-4 py-1 rounded-full bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 text-xs font-black uppercase tracking-wider">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </span>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative px-4"
      >
        <CarouselContent className="-ml-4">
          {reviews.map((review, idx) => (
            <CarouselItem key={review.id || idx} className="pl-4 basis-full md:basis-1/2">
              <div className="h-full bg-slate-50/50 dark:bg-slate-950/40 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-all hover:shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                        {review.patient?.avatar ? (
                          <Image
                            src={review.patient.avatar}
                            alt={review.patient.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase text-xs">
                            {review.patient?.name?.charAt(0) || "U"}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{review.patient?.name || "Unknown Patient"}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icons.star
                          key={star}
                          className={cn(
                            "w-3 h-3",
                            star <= (review.rating || 0)
                              ? "fill-orange-400 text-orange-400"
                              : "fill-slate-200 text-slate-300 dark:fill-slate-800 dark:text-slate-700"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic line-clamp-4">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {reviews.length > 2 && (
          <>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800 hover:text-teal-500 hover:border-teal-500/20 hidden md:flex" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800 hover:text-teal-500 hover:border-teal-500/20 hidden md:flex" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default DoctorReviews;
