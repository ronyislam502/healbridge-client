import * as React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface HBSelectProps {
  label?: string;
  labelRight?: React.ReactNode;
  placeholder?: string;
  options?: { value: string; label: string }[];
  error?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
}

const HBSelect = ({
  label,
  labelRight,
  placeholder,
  options = [],
  error,
  value,
  onValueChange,
  defaultValue,
  className,
  containerClassName,
  disabled,
}: HBSelectProps) => {
  return (
    <div className={cn("space-y-2 w-full", containerClassName)}>
      {(label || labelRight) && (
        <div className="flex items-center justify-between">
          {label && (
            <Label 
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
      
      <Select 
        value={value} 
        onValueChange={onValueChange} 
        defaultValue={defaultValue}
        disabled={disabled}
      >
        <SelectTrigger 
          className={cn(
            "w-full transition-all duration-200",
            "focus:ring-teal-500",
            error && "border-destructive focus:ring-destructive",
            "bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export { HBSelect };
