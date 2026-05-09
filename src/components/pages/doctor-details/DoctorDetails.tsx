"use client"

import { TDoctor } from "@/types/user";
import DoctorInfo from "./components/DoctorInfo";
import DoctorSchedules from "./components/DoctorSchedules";

interface DoctorDetailsProps {
  doctor: TDoctor;
}

const DoctorDetails = ({ doctor }: DoctorDetailsProps) => {
  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Doctor Profile & Information */}
        <DoctorInfo doctor={doctor} />

        {/* Right Column: Appointment Booking & Calendar */}
        <DoctorSchedules 
          doctorSchedules={doctor.doctorSchedules} 
          appointmentFee={doctor.appointmentFee} 
        />
      </div>
    </div>
  );
};

export default DoctorDetails;
