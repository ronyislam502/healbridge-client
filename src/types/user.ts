import { Schedule, TSpecialty } from "./specialty"

export type TAdmin= {
  id: string
  name: string
  email: string
  avatar: string
  phone: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export type TDoctor= {
  id: string
  name: string
  email: string
  avatar: any
  phone: string
  address: string
  registrationNumber: string
  experience: number
  gender: string
  appointmentFee: number
  qualification: string
  currentWorkingPlace: string
  designation: string
  isDeleted: boolean
  createdAt: string
  updateAt: string
  doctorSpecialties: TSpecialty[]
  doctorSchedules: Schedule[]
}

export type TPatient= {
  id: string
  email: string
  name: string
  address: string
  avatar: string
  phone: string
  gender: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}


const healthDataSchema = z.object({
  bloodGroup: z.string().optional(),
  dateOfBirth: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  hasAllergies: z.string().optional(),
  hasDiabetes: z.string().optional(),
  smokingStatus: z.string().optional(),
  pregnancyStatus: z.string().optional(),
  hasPastSurgeries: z.string().optional(),
  recentAnxiety: z.string().optional(),
  recentDepression: z.string().optional(),
  maritalStatus: z.string().optional(),
  dietaryPreferences: z.string().optional(),
  mentalHealthHistory: z.string().optional(),
  immunizationStatus: z.string().optional(),
});