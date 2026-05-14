import { Icons } from "@/components/shared/Icons";

export const adminLinks = [
  { label: 'Dashboard', href: '/admin', icon: Icons.activity },
  { label: 'Appointments', href: '/admin/appointments', icon: Icons.calendar },
  { label: 'Schedules', href: '/admin/schedules', icon: Icons.calendarClock },
  { label: 'Doctors', href: '/admin/doctors', icon: Icons.userCheck },
  { label: 'Patients', href: '/admin/patients', icon: Icons.users },
  { label: 'Specialties', href: '/admin/specialties', icon: Icons.microscope },
  { label: 'Reviews', href: '/admin/reviews', icon: Icons.star },
  { label: 'Prescriptions', href: '/admin/prescriptions', icon: Icons.scrollText },
  { label: 'Admins', href: '/admin/admins', icon: Icons.shieldCheck },
  { label: 'Users', href: '/admin/users', icon: Icons.users },
  { label: 'Settings', href: '/admin/settings', icon: Icons.shieldCheck },
];

export const doctorLinks = [
  { label: 'Dashboard', href: '/doctor', icon: Icons.activity },
  { label: 'Schedules', href: '/doctor/schedules', icon: Icons.calendarClock },
  { label: 'My-Schedules', href: '/doctor/my-schedules', icon: Icons.calendarClock },
  { label: 'Appointments', href: '/doctor/appointments', icon: Icons.calendar },
  { label: 'Prescriptions', href: '/doctor/prescriptions', icon: Icons.scrollText },
  { label: 'Reviews', href: '/doctor/reviews', icon: Icons.star },
  { label: 'Profile', href: '/doctor/profile', icon: Icons.userCircle },
];

export const patientLinks = [
  { label: 'Dashboard', href: '/patient', icon: Icons.activity },
  { label: 'Appointments', href: '/patient/appointments', icon: Icons.calendar },
  { label: 'Prescriptions', href: '/patient/prescriptions', icon: Icons.scrollText },
  { label: 'Medical Reports', href: '/patient/medical-reports', icon: Icons.fileText },
  { label: 'Payments', href: '/patient/payments', icon: Icons.creditCard },
  { label: 'Profile', href: '/patient/profile', icon: Icons.userCircle },
];

