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
import { useUpdatePatientHealthDataMutation } from '@/redux/features/patient/patientApi';
import { bloodGroupOptions, booleanOptions, maritalStatusOptions } from '@/types/global';

interface UpdateHealthDataModalProps {
  profileData: any;
}

export const UpdateHealthDataModal = ({ profileData }: UpdateHealthDataModalProps) => {
  const [updateHealthData, { isLoading: isUpdating }] = useUpdatePatientHealthDataMutation();
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

      const res = await updateHealthData(payload).unwrap();
      if (res?.success) {
        toast.success('Health & Clinical Profile updated successfully!');
        setIsOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update health profile');
    }
  };


  const defaultValues = {
    dateOfBirth: profileData?.patientHealthData?.dateOfBirth || '',
    bloodGroup: profileData?.patientHealthData?.bloodGroup || '',
    hasAllergies: profileData?.patientHealthData?.hasAllergies !== null && profileData?.patientHealthData?.hasAllergies !== undefined
      ? String(profileData?.patientHealthData?.hasAllergies)
      : 'false',
    hasDiabetes: profileData?.patientHealthData?.hasDiabetes !== null && profileData?.patientHealthData?.hasDiabetes !== undefined
      ? String(profileData?.patientHealthData?.hasDiabetes)
      : 'false',
    height: profileData?.patientHealthData?.height || '',
    weight: profileData?.patientHealthData?.weight || '',
    smokingStatus: profileData?.patientHealthData?.smokingStatus !== null && profileData?.patientHealthData?.smokingStatus !== undefined
      ? String(profileData?.patientHealthData?.smokingStatus)
      : 'false',
    dietaryPreferences: profileData?.patientHealthData?.dietaryPreferences || '',
    pregnancyStatus: profileData?.patientHealthData?.pregnancyStatus !== null && profileData?.patientHealthData?.pregnancyStatus !== undefined
      ? String(profileData?.patientHealthData?.pregnancyStatus)
      : 'false',
    mentalHealthHistory: profileData?.patientHealthData?.mentalHealthHistory || '',
    immunizationStatus: profileData?.patientHealthData?.immunizationStatus || '',
    hasPastSurgeries: profileData?.patientHealthData?.hasPastSurgeries !== null && profileData?.patientHealthData?.hasPastSurgeries !== undefined
      ? String(profileData?.patientHealthData?.hasPastSurgeries)
      : 'false',
    recentAnxiety: profileData?.patientHealthData?.recentAnxiety !== null && profileData?.patientHealthData?.recentAnxiety !== undefined
      ? String(profileData?.patientHealthData?.recentAnxiety)
      : 'false',
    recentDepression: profileData?.patientHealthData?.recentDepression !== null && profileData?.patientHealthData?.recentDepression !== undefined
      ? String(profileData?.patientHealthData?.recentDepression)
      : 'false',
    maritalStatus: profileData?.patientHealthData?.maritalStatus || 'UNMARRIED',
  };

  return (
    <HBModal
      title="Update Health Profile"
      description="Update your medical and physical details."
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 transition-all flex items-center gap-2 group cursor-pointer">
          <Icons.activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Update Health Info
        </Button>
      }
    >
      <HBForm 
        onSubmit={onSubmit} 
        className="space-y-6"
        defaultValues={defaultValues}
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
          disabled={isUpdating}
          className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest transition-all"
        >
          {isUpdating ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : <Icons.check className="w-4 h-4" />}
          Save Health Details
        </Button>
      </HBForm>
    </HBModal>
  );
};
