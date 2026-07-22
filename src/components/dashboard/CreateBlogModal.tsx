'use client';

import * as React from 'react';
import { HBModal } from '@/components/shared/HBModal';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { HBSelect } from '@/components/form/HBSelect';
import { HBTextarea } from '@/components/form/HBTextarea';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useCreateBlogMutation } from '@/redux/features/blog/blogApi';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const blogCategories = [
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Wellness', value: 'Wellness' },
  { label: 'Medical Advice', value: 'Medical Advice' },
  { label: 'Nutrition', value: 'Nutrition' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Mental Health', value: 'Mental Health' },
  { label: 'Dental Care', value: 'Dental Care' },
];

const countWords = (text: string = ''): number => {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const createBlogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must be less than 150 characters"),
  category: z.string().min(1, "Please select a category"),
  features: z
    .array(
      z.object({
        value: z.string().min(1, "Paragraph content cannot be empty"),
      })
    )
    .min(1, "At least one paragraph feature is required"),
});

type CreateBlogFormValues = z.infer<typeof createBlogSchema>;

interface CreateBlogModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CreateBlogModal = ({ trigger, open: externalOpen, onOpenChange }: CreateBlogModalProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();

  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;

  const methods = useForm<CreateBlogFormValues>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: '',
      category: '',
      features: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'features',
  });

  const handleToggle = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setInternalOpen(newOpen);
    }

    if (!newOpen) {
      methods.reset({
        title: '',
        category: '',
        features: [{ value: '' }],
      });
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: CreateBlogFormValues) => {
    const featureParagraphs = data.features.map(f => f.value.trim()).filter(Boolean);

    if (featureParagraphs.length === 0) {
      toast.error("Please provide at least one non-empty paragraph.");
      return;
    }

    // Enforce 200 word limit per paragraph
    for (let i = 0; i < featureParagraphs.length; i++) {
      const words = countWords(featureParagraphs[i]);
      if (words > 200) {
        toast.error(`Paragraph ${i + 1} exceeds maximum 200 words limit (currently ${words} words).`);
        return;
      }
    }

    try {
      const res = await createBlog({
        title: data.title,
        category: data.category,
        features: featureParagraphs,
        ...(file && { image: file }),
      }).unwrap();

      if (res?.success) {
        toast.success("Blog published successfully!");
        handleToggle(false);
      } else {
        toast.error(res?.message || "Failed to publish blog.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to publish blog.");
    }
  };

  return (
    <HBModal
      open={isOpen}
      onOpenChange={handleToggle}
      title="Create New Blog Article"
      description="Structure your article into paragraphs (max 200 words per paragraph)."
      className="sm:max-w-4xl max-h-[90vh] overflow-y-auto"
      trigger={
        trigger || (
          <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-teal-500 transition-all flex items-center gap-3">
            <Icons.edit className="w-5 h-5" />
            Write New Blog
          </Button>
        )
      }
    >
      <HBForm methods={methods} onSubmit={onSubmit}>
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-1">
              <HBInput
                name="title"
                label="Article Title"
                placeholder="e.g. 10 Habits for Better Heart Health"
                icon={<Icons.fileText className="w-4 h-4 text-teal-500" />}
                required
              />
            </div>
            <div className="md:col-span-1">
              <HBSelect
                name="category"
                label="Category"
                placeholder="Select category"
                options={blogCategories}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1 block">
              Cover Image
            </label>
            <label className="relative cursor-pointer group block">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-800 group-hover:border-teal-500/50 transition-all flex flex-col items-center justify-center text-center">
                {preview ? (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-900 group">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        onClick={handleRemoveFile}
                        variant="destructive"
                        size="sm"
                        className="rounded-xl font-bold flex items-center gap-2"
                      >
                        <Icons.trash className="w-4 h-4" /> Remove Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-teal-500 shadow-md mb-3 transition-colors">
                      <Icons.image className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest italic">
                      Upload Banner / Cover Image
                    </p>
                    <p className="text-[10px] font-medium text-slate-500 mt-1">
                      PNG, JPG, WEBP up to 5MB (1200x630px recommended)
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Features (Multiple Paragraphs) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-[12px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest italic block">
                  Article Paragraphs (Features)
                </label>
                <p className="text-[11px] text-slate-500 font-medium">
                  Add article sections. Maximum 200 words per paragraph.
                </p>
              </div>
              <Button
                type="button"
                onClick={() => append({ value: '' })}
                variant="outline"
                size="sm"
                className="rounded-xl border-teal-500/30 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 font-bold flex items-center gap-2"
              >
                <Icons.plus className="w-4 h-4" /> Add Paragraph
              </Button>
            </div>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {fields.map((field, index) => {
                const currentText = methods.watch(`features.${index}.value`) || '';
                const wordCount = countWords(currentText);
                const isOverLimit = wordCount > 200;

                return (
                  <div
                    key={field.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isOverLimit
                        ? 'bg-red-500/5 border-red-500/40'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider italic">
                        Paragraph {index + 1}
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            isOverLimit
                              ? 'bg-red-500/20 text-red-600 dark:text-red-400 font-black'
                              : wordCount > 170
                              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                              : 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                          }`}
                        >
                          {wordCount} / 200 words
                        </span>
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                            title="Remove paragraph"
                          >
                            <Icons.trash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <HBTextarea
                      name={`features.${index}.value`}
                      placeholder={`Write content for paragraph ${index + 1}...`}
                    />

                    {isOverLimit && (
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-wide mt-2 animate-in fade-in">
                        ⚠️ Maximum limit of 200 words exceeded for Paragraph {index + 1}!
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="submit"
              disabled={isCreating}
              className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex-1"
            >
              {isCreating ? (
                <span className="flex items-center gap-2">
                  <Icons.loader2 className="w-5 h-5 animate-spin" />
                  Publishing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Icons.check className="w-5 h-5" />
                  Publish Article
                </span>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleToggle(false)}
              className="h-14 px-8 rounded-2xl border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </Button>
          </div>
        </div>
      </HBForm>
    </HBModal>
  );
};
