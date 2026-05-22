"use client"

import { TDoctor } from "@/types/user";
import DoctorInfo from "./components/DoctorInfo";
import DoctorSchedules from "./components/DoctorSchedules";
import DoctorReviews from "./components/DoctorReviews";

interface DoctorDetailsProps {
  doctor: TDoctor;
}

const DoctorDetails = ({ doctor }: DoctorDetailsProps) => {
  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Doctor Profile & Information */}
        <div className="lg:col-span-2">
          <DoctorInfo doctor={doctor} />
          {doctor.review && doctor.review.length > 0 && (
            <DoctorReviews reviews={doctor.review} />
          )}
        </div>

        {/* Right Column: Appointment Booking & Calendar */}
        <div className="lg:col-span-1">
          <DoctorSchedules 
            doctorSchedules={doctor.doctorSchedules} 
            appointmentFee={doctor.appointmentFee} 
            doctorId={doctor.id}
            doctorName={doctor.name}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
