import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/Icons";
import Image from "next/image";

interface DoctorReviewsProps {
  reviews: any[];
}

const DoctorReviews = ({ reviews }: DoctorReviewsProps) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl mt-8">
      <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-6">Patient Reviews</h3>
      
      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div key={review.id || idx} className="border-b border-slate-100 dark:border-slate-800 last:border-0 pb-6 last:pb-0">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                {review.patient?.avatar ? (
                  <Image
                    src={review.patient.avatar}
                    alt={review.patient.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase">
                    {review.patient?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">{review.patient?.name || "Unknown Patient"}</h4>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icons.star
                        key={star}
                        className={cn(
                          "w-3.5 h-3.5",
                          star <= (review.rating || 0)
                            ? "fill-orange-400 text-orange-400"
                            : "fill-slate-100 text-slate-200 dark:fill-slate-800 dark:text-slate-700"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorReviews;
