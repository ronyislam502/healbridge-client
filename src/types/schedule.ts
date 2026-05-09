export interface ISchedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDoctorSchedule {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
  schedule: ISchedule;
}

export interface IScheduleFilters {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}
