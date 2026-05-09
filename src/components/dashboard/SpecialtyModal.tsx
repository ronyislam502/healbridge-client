'use client';

import * as React from "react";
import { HBModal } from "@/components/shared/HBModal";
import { HBForm } from "@/components/shared/HBForm";
import { HBInput } from "@/components/shared/HBInput";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateSpecialtyMutation, useUpdateSpecialtyMutation } from "@/redux/features/specialties/specialtiesApi";

interface SpecialtyModalProps {
  mode: 'add' | 'update';
  defaultValues?: any;
  trigger: React.ReactNode;
}

const SpecialtyModal = ({ mode, defaultValues, trigger }: SpecialtyModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(defaultValues?.image || null);
  
  const [createSpecialty, { isLoading: isCreating }] = useCreateSpecialtyMutation();
  const [updateSpecialty, { isLoading: isUpdating }] = useUpdateSpecialtyMutation();

  const isLoading = isCreating || isUpdating;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ title: data.title }));
      if (file) {
        formData.append('icon', file);
      }

      let res;
      if (mode === 'add') {
        res = await createSpecialty(formData).unwrap();
      } else {
        res = await updateSpecialty({ id: defaultValues.id, data: formData }).unwrap();
      }

      if (res?.success) {
        toast.success(`Specialty ${mode === 'add' ? 'created' : 'updated'} successfully!`);
        setOpen(false);
        setFile(null);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${mode} specialty. Please try again.`);
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <HBInput
            label="Specialty Title"
            name="title"
            placeholder="e.g. Cardiology"
            icon={<Icons.activity className="w-4 h-4 text-teal-500" />}
            required
          />
          
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1 block">Icon Representation</label>
            
            <label className="relative cursor-pointer group block">
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-800 group-hover:border-teal-500/50 transition-all flex flex-col items-center justify-center text-center">
                {preview ? (
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 group-hover:scale-110 transition-transform">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icons.share2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-teal-500 shadow-md mb-4 transition-colors">
                      <Icons.share2 className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest italic">Upload 3D Asset</p>
                    <p className="text-[10px] font-medium text-slate-500 mt-1">Recommended: 800x800px PNG</p>
                  </>
                )}
              </div>
            </label>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
                <Icons.activity className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-teal-400 italic">Platform Sync</p>
                <p className="text-[10px] font-medium text-slate-400 mt-0.5">Changes will reflect instantly across all doctor profiles and search filters.</p>
              </div>
            </div>
            <Icons.activity className="absolute -bottom-4 -right-4 w-20 h-20 text-white/5 rotate-12" />
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="h-16 px-10 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex-1 group"
          >
            {isLoading ? (
              <Icons.loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-3">
                {mode === 'add' ? "Create Specialty" : "Save Changes"}
                <Icons.plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              </span>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-16 px-10 rounded-2xl border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex-1"
          >
            Discard
          </Button>
        </div>
      </HBForm>
    </HBModal>
  );
};

export { SpecialtyModal };

