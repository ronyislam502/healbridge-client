
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { HBTextarea } from '@/components/form/HBTextarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/Icons';
import { useCreatePrescriptionMutation } from '@/redux/features/prescription/prescriptionApi';
import { toast } from 'sonner';

const medicineSchema = z.object({
  name: z.string().min(1, 'Required'),
  dosage: z.string().min(1, 'Required'),
  frequency: z.string().min(1, 'Required'),
  duration: z.string().min(1, 'Required'),
});

const testSchema = z.object({
  name: z.string().min(1, 'Required'),
});

const prescriptionSchema = z.object({
  diagnosis: z.string().min(1, 'Diagnosis is required'),
  introduction: z.string().optional(),
  advice: z.string().optional(),
  followUpDate: z.string().optional(),
  medicines: z.array(medicineSchema).optional(),
  tests: z.array(testSchema).optional(),
});

type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

interface CreatePrescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: string | null;
}

const CreatePrescriptionDialog = ({
  open,
  onOpenChange,
  appointmentId,
}: CreatePrescriptionDialogProps) => {
  const [createPrescription, { isLoading }] = useCreatePrescriptionMutation();

  const methods = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      diagnosis: '',
      introduction: '',
      advice: '',
      followUpDate: '',
      medicines: [],
      tests: [],
    },
  });

  const { control, reset } = methods;

  const {
    fields: medicineFields,
    append: appendMedicine,
    remove: removeMedicine,
  } = useFieldArray({
    control,
    name: 'medicines',
  });

  const {
    fields: testFields,
    append: appendTest,
    remove: removeTest,
  } = useFieldArray({
    control,
    name: 'tests',
  });

  const onSubmit = async (data: PrescriptionFormValues) => {
    if (!appointmentId) return;

    const toastId = toast.loading('Creating prescription...');
    try {
      const payload = {
        appointmentId,
        diagnosis: data.diagnosis,
        introduction: data.introduction,
        advice: data.advice,
        followUpDate: data.followUpDate ? new Date(data.followUpDate).toISOString() : null,
        medicines: data.medicines,
        tests: data.tests,
      };

      const res = await createPrescription(payload).unwrap();
      if (res.success) {
        toast.success('Prescription created successfully!', { id: toastId });
        reset();
        onOpenChange(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create prescription', { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic">Write Prescription</DialogTitle>
          <DialogDescription>
            Fill out the prescription details for this patient appointment.
          </DialogDescription>
        </DialogHeader>

        <HBForm methods={methods} onSubmit={onSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <HBInput name="diagnosis" label="Diagnosis *" placeholder="e.g., Viral Fever" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <HBInput name="followUpDate" type="date" label="Follow-up Date" />
            </div>
          </div>

          <HBTextarea name="introduction" label="Introduction / Notes" placeholder="Clinical notes, patient symptoms, etc." />

          {/* Medicines Section */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <Label className="font-bold text-lg text-teal-600 dark:text-teal-400">Medicines</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendMedicine({ name: '', dosage: '', frequency: '', duration: '' })}
                className="h-8 rounded-xl font-bold"
              >
                <Icons.plus className="w-4 h-4 mr-2" /> Add Medicine
              </Button>
            </div>

            {medicineFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-12 gap-2 items-start relative pb-2 border-b border-slate-200 dark:border-slate-800 last:border-0 last:pb-0">
                <div className="col-span-12 md:col-span-4">
                  <HBInput name={`medicines.${index}.name`} placeholder="Medicine name" />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <HBInput name={`medicines.${index}.dosage`} placeholder="Dosage (e.g. 500mg)" />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <HBInput name={`medicines.${index}.frequency`} placeholder="Freq (e.g. 1+0+1)" />
                </div>
                <div className="col-span-10 md:col-span-1">
                  <HBInput name={`medicines.${index}.duration`} placeholder="Days" />
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-end mt-1 md:mt-0">
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeMedicine(index)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 p-2 h-9 w-9">
                    <Icons.trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {medicineFields.length === 0 && (
              <p className="text-xs text-slate-400 italic">No medicines added yet.</p>
            )}
          </div>

          {/* Tests Section */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <Label className="font-bold text-lg text-blue-600 dark:text-blue-400">Tests (Investigations)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendTest({ name: '' })}
                className="h-8 rounded-xl font-bold"
              >
                <Icons.plus className="w-4 h-4 mr-2" /> Add Test
              </Button>
            </div>

            {testFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <div className="flex-1">
                  <HBInput name={`tests.${index}.name`} placeholder="Test name (e.g., CBC, X-Ray Chest)" />
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeTest(index)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 p-2 h-10 w-10 mt-1">
                  <Icons.trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {testFields.length === 0 && (
              <p className="text-xs text-slate-400 italic">No tests added yet.</p>
            )}
          </div>

          <HBTextarea name="advice" label="General Advice" placeholder="e.g., Drink plenty of water, take rest." />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl font-bold bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isLoading ? (
                <><Icons.loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
              ) : (
                <><Icons.check className="w-4 h-4 mr-2" /> Issue Prescription</>
              )}
            </Button>
          </div>
        </HBForm>
      </DialogContent>
    </Dialog>
  );
}


export default CreatePrescriptionDialog;