
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { HBForm } from "@/components/shared/HBForm";
import { HBTextarea } from "@/components/shared/HBTextarea";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldLabel } from "../ui/field";
import { useState } from "react";

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string | null;
  doctorName?: string;
}

const reviewSchema = z.object({
  comment: z.string().min(1, "Please write a comment").max(500, "Comment too long"),
});

const CreateReviewModal = ({ isOpen, onClose, appointmentId, doctorName }: CreateReviewModalProps) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (data: FieldValues) => {
    if (!appointmentId) return;

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      const reviewData = {
        appointmentId,
        rating,
        comment: data.comment
      };
      const res = await createReview(reviewData).unwrap();

      if (res?.success) {
        toast.success("Review submitted successfully");
        setRating(0);
        onClose();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-black italic uppercase tracking-wider">Leave a Review</DialogTitle>
          <DialogDescription>
            Share your experience with {doctorName ? <span className="font-bold text-teal-500">{doctorName}</span> : "the doctor"}.
          </DialogDescription>
        </DialogHeader>

        <HBForm
          onSubmit={handleSubmit}
          resolver={zodResolver(reviewSchema)}
          defaultValues={{ comment: "" }}
          className="space-y-6 mt-4"
        >
          <div className="space-y-2">
            <FieldLabel className="text-[10px] font-black text-success uppercase tracking-widest italic">Rating</FieldLabel>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Icons.star
                    className={cn(
                      "w-8 h-8 transition-colors",
                      (hoverRating || rating) >= star
                        ? "fill-orange-400 text-orange-400"
                        : "fill-slate-100 text-slate-200 dark:fill-slate-800 dark:text-slate-700"
                    )}
                  />
                </Button>
              ))}
            </div>
          </div>

          <HBTextarea
            name="comment"
            label="Comment"
            placeholder="How was your consultation?"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-teal-500/20"
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </HBForm>
      </DialogContent>
    </Dialog>
  );
}


export default CreateReviewModal;