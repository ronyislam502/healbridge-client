export type TSpecialty= {
  id: string
  title: string
  icon: string
  createdAt: string
  updatedAt: string
}

export type DoctorSpecialty= {
  specialtiesId: string
  doctorId: string
  createdAt: string
  updatedAt: string
  specialties: TSpecialty[]
}


export type DoctorSchedule= {
  doctorId: string
  scheduleId: string
  isBooked: boolean
  appointmentId?: string
  createdAt: string
  updatedAt: string
  schedule: Schedule
}

export interface Schedule {
  id: string
  startDateTime: string
  endDateTime: string
  createdAt: string
  updatedAt: string
}