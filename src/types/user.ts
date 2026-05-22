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
  review?: any[]
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