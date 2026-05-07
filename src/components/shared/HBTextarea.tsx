import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface HBTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelRight?: React.ReactNode;
  error?: string;
  containerClassName?: string;
}

const HBTextarea = React.forwardRef<HTMLTextAreaElement, HBTextareaProps>(
  ({ label, labelRight, error, className, containerClassName, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className={cn("space-y-2 w-full", containerClassName)}>
        {(label || labelRight) && (
          <div className="flex items-center justify-between">
            {label && (
              <Label 
                htmlFor={inputId}
                className={cn(
                  "text-sm font-medium transition-colors",
                  error ? "text-destructive" : "text-slate-700 dark:text-slate-300"
                )}
              >
                {label}
              </Label>
            )}
            {labelRight}
          </div>
        )}
        <Textarea
          id={inputId}
          ref={ref}
          className={cn(
            "transition-all duration-200 min-h-[100px]",
            "focus-visible:ring-teal-500",
            error && "border-destructive focus-visible:ring-destructive",
            "bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

HBTextarea.displayName = "HBTextarea";

export { HBTextarea };
