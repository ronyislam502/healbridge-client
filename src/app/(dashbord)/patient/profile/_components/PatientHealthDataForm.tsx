'use client';

import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';


export const PatientHealthDataForm = ({ profileData, onSuccess }: { profileData: any, onSuccess?: () => void }) => {
  const [createHealthData, { isLoading: isCreating }] = useCreateHealthDataMutation();
  const [updateHealthData, { isLoading: isUpdating }] = useUpdateHealthDataMutation();
  
  const isUpdatingPatient = isCreating || isUpdating;

  const onHealthSubmit = async (values: FieldValues) => {
    try {
      const parseString = (val: any) => {
        if (val === '' || val === 'NONE') return null;
        return val;
      };

      const parseBoolean = (val: any) => {
        if (val === 'true') return true;
        if (val === 'false') return false;
        if (val === '' || val === 'NONE') return null;
        return undefined;
      };

      const patientHealthDataPayload = {
        bloodGroup: parseString(values?.bloodGroup),
        dateOfBirth: parseString(values?.dateOfBirth),
        height: parseString(values?.height),
        weight: parseString(values?.weight),
        hasAllergies: parseBoolean(values?.hasAllergies),
        hasDiabetes: parseBoolean(values?.hasDiabetes),
        smokingStatus: parseBoolean(values?.smokingStatus),
        pregnancyStatus: parseBoolean(values?.pregnancyStatus),
        hasPastSurgeries: parseBoolean(values?.hasPastSurgeries),
        recentAnxiety: parseBoolean(values?.recentAnxiety),
        recentDepression: parseBoolean(values?.recentDepression),
        maritalStatus: parseString(values?.maritalStatus),
        dietaryPreferences: parseString(values?.dietaryPreferences),
        mentalHealthHistory: parseString(values?.mentalHealthHistory),
        immunizationStatus: parseString(values?.immunizationStatus),
      };

      const cleanedHealthData = Object.fromEntries(
        Object.entries(patientHealthDataPayload).filter(([_, v]) => v !== undefined)
      );

      if (Object.keys(cleanedHealthData).length === 0) {
        toast.success('No changes to save');
        if (onSuccess) onSuccess();
        return;
      }

      let res;
      if (profileData?.patientHealthData) {
        res = await updateHealthData(cleanedHealthData).unwrap();
      } else {
        res = await createHealthData(cleanedHealthData).unwrap();
      }

      if (res?.success) {
        toast.success('Health data saved successfully!');
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update health data');
    }
  };

  return (
    <HBForm 
      onSubmit={onHealthSubmit} 
      resolver={zodResolver(healthDataSchema)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HBSelect 
          name="bloodGroup" 
          label="Blood Group" 
          options={bloods} 
        />
        <HBInput name="dateOfBirth" label="Date of Birth" type="date" />
        <HBInput name="height" label='Height (e.g. 5"10)' />
        <HBInput name="weight" label="Weight (e.g. 70kg)" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <HBSelect 
                    name="hasAllergies" 
                    label="Allergies?" 
                    options={options} 
                  />
                  <HBSelect 
                    name="hasDiabetes" 
                    label="Diabetes?" 
                    options={options} 
                  />
                  <HBSelect 
                    name="smokingStatus" 
                    label="Smoker?" 
                    options={options} 
                  />
                  <HBSelect 
                    name="pregnancyStatus" 
                    label="Pregnant?" 
                    options={options} 
                  />
                  <HBSelect 
                    name="hasPastSurgeries" 
                    label="Past Surgeries?" 
                    options={options} 
                  />
                  <HBSelect 
                    name="recentAnxiety" 
                    label="Recent Anxiety?" 
                    options={options} 
                  />
                  <HBSelect 
                    name="recentDepression" 
                    label="Recent Depression?" 
                    options={options} 
                  />
                  <HBSelect 
                    name="maritalStatus" 
                    label="Marital Status" 
                    options={maritalStatus} 
                  />
      </div>
      <HBTextarea name="dietaryPreferences" label="Dietary Preferences" placeholder="e.g. Vegetarian, Keto..." />
      <HBTextarea name="mentalHealthHistory" label="Mental Health History" placeholder="Any previous conditions..." />
      <HBTextarea name="immunizationStatus" label="Immunization Status" placeholder="Current vaccinations..." />
      
      <Button 
        type="submit" 
        disabled={isUpdatingPatient}
        className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
      >
        {isUpdatingPatient ? <Icons.settings className="w-4 h-4 animate-spin" /> : <Icons.save className="w-4 h-4" />}
        Save Medical Records
      </Button>
    </HBForm>
  );
};
