import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HBInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelRight?: React.ReactNode;
  icon?: LucideIcon;
  error?: string;
  containerClassName?: string;
}

const HBInput = React.forwardRef<HTMLInputElement, HBInputProps>(
  ({ label, labelRight, icon: Icon, error, className, containerClassName, id, ...props }, ref) => {

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

        <div className="relative group">
          {Icon && (
            <div className="absolute left-3 top-3 transition-colors text-slate-400 group-focus-within:text-teal-500">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <Input
            id={inputId}
            ref={ref}
            className={cn(
              "transition-all duration-200",
              Icon && "pl-10",
              "focus-visible:ring-teal-500",
              error && "border-destructive focus-visible:ring-destructive",
              "bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

HBInput.displayName = "HBInput";

export { HBInput };
