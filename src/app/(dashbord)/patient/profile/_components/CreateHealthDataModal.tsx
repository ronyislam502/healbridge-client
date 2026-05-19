'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { HBForm } from '@/components/shared/HBForm';
import { HBInput } from '@/components/shared/HBInput';
import { HBSelect } from '@/components/shared/HBSelect';
import { Button } from '@/components/ui/button';
import { HBModal } from '@/components/shared/HBModal';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreatePatientHealthDataMutation } from '@/redux/features/patient/patientApi';
import { bloodGroupOptions, booleanOptions, maritalStatusOptions } from '@/types/global';

interface CreateHealthDataModalProps {
  profileData: any;
}

export const CreateHealthDataModal = ({ profileData }: CreateHealthDataModalProps) => {
  const [createHealthData, { isLoading: isCreating }] = useCreatePatientHealthDataMutation();
  const [isOpen, setIsOpen] = React.useState(false);

  const onSubmit = async (values: FieldValues) => {
    try {
      const payload = {
        dateOfBirth: values?.dateOfBirth || undefined,
        bloodGroup: values?.bloodGroup,
        hasAllergies: values?.hasAllergies === 'true',
        hasDiabetes: values?.hasDiabetes === 'true',
        height: values?.height,
        weight: values?.weight,
        smokingStatus: values?.smokingStatus === 'true',
        dietaryPreferences: values?.dietaryPreferences || undefined,
        pregnancyStatus: values?.pregnancyStatus === 'true',
        mentalHealthHistory: values?.mentalHealthHistory || undefined,
        immunizationStatus: values?.immunizationStatus || undefined,
        hasPastSurgeries: values?.hasPastSurgeries === 'true',
        recentAnxiety: values?.recentAnxiety === 'true',
        recentDepression: values?.recentDepression === 'true',
        maritalStatus: values?.maritalStatus,
      };

      const res = await createHealthData(payload).unwrap();
      if (res?.success) {
        toast.success('Health profile created successfully!');
        setIsOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create health profile');
    }
  };

  return (
    <HBModal
      title="Create Health Profile"
      description="Set up your medical and physical details for the first time."
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2 group cursor-pointer">
          <Icons.plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Add Health Data
        </Button>
      }
    >
      <HBForm
        onSubmit={onSubmit}
        className="space-y-6"
        defaultValues={{
          maritalStatus: 'UNMARRIED',
          hasAllergies: 'false',
          hasDiabetes: 'false',
          smokingStatus: 'false',
          pregnancyStatus: 'false',
          hasPastSurgeries: 'false',
          recentAnxiety: 'false',
          recentDepression: 'false',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HBInput name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" icon={<Icons.calendar className="w-4 h-4" />} />
          <HBSelect name="bloodGroup" label="Blood Group" options={bloodGroupOptions} />
          <HBInput name="height" label="Height" placeholder="e.g. 175 cm" icon={<Icons.ruler className="w-4 h-4" />} />
          <HBInput name="weight" label="Weight" placeholder="e.g. 70 kg" icon={<Icons.weight className="w-4 h-4" />} />
          <HBSelect name="maritalStatus" label="Marital Status" options={maritalStatusOptions} />
          <HBSelect name="hasAllergies" label="Has Allergies?" options={booleanOptions} />
          <HBSelect name="hasDiabetes" label="Has Diabetes?" options={booleanOptions} />
          <HBSelect name="smokingStatus" label="Smoker?" options={booleanOptions} />
          <HBSelect name="hasPastSurgeries" label="Has Past Surgeries?" options={booleanOptions} />
          <HBSelect name="recentAnxiety" label="Recent Anxiety?" options={booleanOptions} />
          <HBSelect name="recentDepression" label="Recent Depression?" options={booleanOptions} />
          {profileData?.gender === 'FEMALE' && (
            <HBSelect name="pregnancyStatus" label="Is Pregnant?" options={booleanOptions} />
          )}
          <HBInput name="dietaryPreferences" label="Dietary Preferences" placeholder="e.g. Vegetarian" icon={<Icons.activity className="w-4 h-4" />} />
          <HBInput name="mentalHealthHistory" label="Mental Health History" placeholder="e.g. None" icon={<Icons.brain className="w-4 h-4" />} />
          <HBInput name="immunizationStatus" label="Immunization Status" placeholder="e.g. Fully vaccinated" icon={<Icons.shieldCheck className="w-4 h-4" />} />
        </div>

        <Button
          type="submit"
          disabled={isCreating}
          className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest transition-all"
        >
          {isCreating ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : <Icons.plus className="w-4 h-4" />}
          Create Health Profile
        </Button>
      </HBForm>
    </HBModal>
  );
};
