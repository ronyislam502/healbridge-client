'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { HBForm } from '@/components/shared/HBForm';
import { HBInput } from '@/components/shared/HBInput';
import { HBSelect } from '@/components/shared/HBSelect';
import { HBTextarea } from '@/components/shared/HBTextarea';
import { Button } from '@/components/ui/button';
import { HBModal } from '@/components/shared/HBModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useUpdatePatientMutation } from '@/redux/features/patient/patientApi';

interface UpdateHealthProfileModalProps {
  profileData: any;
}

export const UpdateHealthProfileModal = ({ profileData }: UpdateHealthProfileModalProps) => {
  const [updateHealth, { isLoading: isUpdating }] = useUpdatePatientMutation();
  const [isOpen, setIsOpen] = React.useState(false);

  const onSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      
      const healthData = {
        patientHealthData: {
          dateOfBirth: values?.dateOfBirth,
          bloodGroup: values?.bloodGroup,
          height: values?.height,
          weight: values?.weight,
          maritalStatus: values?.maritalStatus,
          dietaryPreferences: values?.dietaryPreferences,
          mentalHealthHistory: values?.mentalHealthHistory,
          immunizationStatus: values?.immunizationStatus,
          hasAllergies: values?.hasAllergies,
          hasDiabetes: values?.hasDiabetes,
          smokingStatus: values?.smokingStatus,
          pregnancyStatus: values?.pregnancyStatus,
          hasPastSurgeries: values?.hasPastSurgeries,
          recentAnxiety: values?.recentAnxiety,
          recentDepression: values?.recentDepression,
        }
      };

      formData.append('data', JSON.stringify(healthData));

      const res = await updateHealth(formData).unwrap();
      if (res?.success) {
        toast.success('Health profile updated successfully!');
        setIsOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update health profile');
    }
  };

  const bloodGroupOptions = [
    { key: 'A_POSITIVE', label: 'A+' },
    { key: 'B_POSITIVE', label: 'B+' },
    { key: 'O_POSITIVE', label: 'O+' },
    { key: 'AB_POSITIVE', label: 'AB+' },
    { key: 'A_NEGATIVE', label: 'A-' },
    { key: 'B_NEGATIVE', label: 'B-' },
    { key: 'O_NEGATIVE', label: 'O-' },
    { key: 'AB_NEGATIVE', label: 'AB-' },
  ];

  const maritalStatusOptions = [
    { key: 'MARRIED', label: 'Married' },
    { key: 'UNMARRIED', label: 'Unmarried' },
  ];

  const booleanOptions = [
    { key: 'true', label: 'Yes' },
    { key: 'false', label: 'No' },
  ];

  const isFemale = profileData?.gender === 'FEMALE';

  return (
    <HBModal
      title="Edit Health & Medical Info"
      description="Keep your clinical profile and health indicators updated for better consultation."
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 transition-all flex items-center gap-2 group cursor-pointer">
          <Icons.activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Health Profile
        </Button>
      }
    >
      <HBForm
        onSubmit={onSubmit}
        className="space-y-6"
        defaultValues={{
          dateOfBirth: profileData?.patientHealthData?.dateOfBirth,
          bloodGroup: profileData?.patientHealthData?.bloodGroup,
          height: profileData?.patientHealthData?.height,
          weight: profileData?.patientHealthData?.weight,
          maritalStatus: profileData?.patientHealthData?.maritalStatus,
          dietaryPreferences: profileData?.patientHealthData?.dietaryPreferences,
          hasAllergies: profileData?.patientHealthData?.hasAllergies,
          hasDiabetes: profileData?.patientHealthData?.hasDiabetes,
          smokingStatus: profileData?.patientHealthData?.smokingStatus,
          pregnancyStatus: profileData?.patientHealthData?.pregnancyStatus,
          hasPastSurgeries: profileData?.patientHealthData?.hasPastSurgeries,
          recentAnxiety: profileData?.patientHealthData?.recentAnxiety,
          recentDepression: profileData?.patientHealthData?.recentDepression,
          mentalHealthHistory: profileData?.patientHealthData?.mentalHealthHistory,
          immunizationStatus: profileData?.patientHealthData?.immunizationStatus,
        }}
      >
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl mb-6 h-auto">
            <TabsTrigger value="general" className="rounded-xl py-3 text-[10px] font-black uppercase tracking-wider italic data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-teal-500 data-[state=active]:shadow-sm">General</TabsTrigger>
            <TabsTrigger value="medical" className="rounded-xl py-3 text-[10px] font-black uppercase tracking-wider italic data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-teal-500 data-[state=active]:shadow-sm">Clinical</TabsTrigger>
            <TabsTrigger value="mental" className="rounded-xl py-3 text-[10px] font-black uppercase tracking-wider italic data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-teal-500 data-[state=active]:shadow-sm">Psych/Imm</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HBInput name="dateOfBirth" label="Date of Birth" type="date" icon={<Icons.calendar className="w-4 h-4" />} />
              <HBSelect name="bloodGroup" label="Blood Group" options={bloodGroupOptions} placeholder="Select blood group" />
              <HBInput name="height" label="Height (e.g. 175 cm)" placeholder="e.g. 175 cm" icon={<Icons.ruler className="w-4 h-4" />} />
              <HBInput name="weight" label="Weight (e.g. 70 kg)" placeholder="e.g. 70 kg" icon={<Icons.weight className="w-4 h-4" />} />
              <HBSelect name="maritalStatus" label="Marital Status" options={maritalStatusOptions} />
              <HBInput name="dietaryPreferences" label="Dietary Preferences" placeholder="e.g. Vegetarian, Keto" icon={<Icons.activity className="w-4 h-4" />} />
            </div>
          </TabsContent>

          <TabsContent value="medical" className="space-y-4 focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HBSelect name="hasAllergies" label="Has Allergies?" options={booleanOptions} placeholder="Select option" />
              <HBSelect name="hasDiabetes" label="Has Diabetes?" options={booleanOptions} placeholder="Select option" />
              <HBSelect name="smokingStatus" label="Smoking Status?" options={booleanOptions} placeholder="Select option" />
              <HBSelect name="hasPastSurgeries" label="Has Past Surgeries?" options={booleanOptions} placeholder="Select option" />
              {isFemale && (
                <HBSelect name="pregnancyStatus" label="Pregnancy Status?" options={booleanOptions} placeholder="Select option" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="mental" className="space-y-4 focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <HBSelect name="recentAnxiety" label="Experiencing Recent Anxiety?" options={booleanOptions} placeholder="Select option" />
              <HBSelect name="recentDepression" label="Experiencing Recent Depression?" options={booleanOptions} placeholder="Select option" />
            </div>
            <HBTextarea name="mentalHealthHistory" label="Mental Health History Details" placeholder="Describe any past mental health diagnoses or treatments..." icon={<Icons.brain className="w-4 h-4" />} />
            <HBTextarea name="immunizationStatus" label="Immunization & Vaccination Status" placeholder="List details about vaccine history or immunizations..." icon={<Icons.shieldCheck className="w-4 h-4" />} />
          </TabsContent>
        </Tabs>

        <Button 
          type="submit" 
          disabled={isUpdating}
          className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer"
        >
          {isUpdating ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : <Icons.check className="w-4 h-4" />}
          Save Health Profile
        </Button>
      </HBForm>
    </HBModal>
  );
};
