"use client"


import DoctorDetails from "@/components/pages/doctor-details/DoctorDetails";
import { useGetSingleDoctorQuery } from "@/redux/features/doctor/doctorApi";
import { use } from "react";

const DoctorDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: doctor, isLoading } = useGetSingleDoctorQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-slate-800">Doctor not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <DoctorDetails doctor={doctor} />
    </div>
  )
}

export default DoctorDetailsPage;