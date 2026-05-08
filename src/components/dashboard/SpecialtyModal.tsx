'use client';

import * as React from "react";
import { HBModal } from "@/components/shared/HBModal";
import { HBForm } from "@/components/shared/HBForm";
import { HBInput } from "@/components/shared/HBInput";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SpecialtyModalProps {
  mode: 'add' | 'update';
  defaultValues?: any;
  trigger: React.ReactNode;
}

const SpecialtyModal = ({ mode, defaultValues, trigger }: SpecialtyModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`${mode === 'add' ? 'Creating' : 'Updating'} Specialty:`, data);
      toast.success(`Specialty ${mode === 'add' ? 'added' : 'updated'} successfully!`);
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to ${mode} specialty. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HBModal
      open={open}
      onOpenChange={setOpen}
      title={mode === 'add' ? "Add New Specialty" : "Update Specialty"}
      description={mode === 'add' 
        ? "Create a new medical category for the platform." 
        : `Update the details for ${defaultValues?.title || 'this specialty'}.`
      }
      trigger={trigger}
    >
      <HBForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div className="space-y-6">
          <HBInput
            label="Specialty Title"
            name="title"
            placeholder="e.g. Cardiology"
            icon={<Icons.activity className="w-4 h-4" />}
            required
          />
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Icon Representation</label>
            <div className="grid grid-cols-5 gap-3">
              {[Icons.heart, Icons.brain, Icons.baby, Icons.award, Icons.microscope].map((Icon, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="w-full aspect-square rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-500 hover:bg-teal-500/10 border border-transparent hover:border-teal-500/20 transition-all"
                >
                  <Icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-teal-500/5 border border-dashed border-teal-500/20 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-teal-500/10 transition-colors">
             <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-teal-500 mb-3 shadow-md group-hover:scale-110 transition-transform">
                <Icons.share2 className="w-6 h-6" />
             </div>
             <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest italic">
                {defaultValues?.image ? "Change 3D Asset" : "Upload 3D Asset"}
             </p>
             <p className="text-[10px] font-medium text-slate-500 mt-1">Recommended: 800x800px PNG</p>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="h-14 px-10 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex-1"
          >
            {isLoading ? (
              <Icons.loader2 className="w-5 h-5 animate-spin" />
            ) : (
              mode === 'add' ? "Create Specialty" : "Save Changes"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-14 px-10 rounded-2xl border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex-1"
          >
            Cancel
          </Button>
        </div>
      </HBForm>
    </HBModal>
  );
};

export { SpecialtyModal };
