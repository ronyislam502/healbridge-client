import { baseApi } from "../../api/baseApi";

export const doctorScheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctorSchedules: builder.query({
      query: (params: Record<string, string | number | boolean | undefined>) => ({
        url: "/doctor-schedules",
        method: "GET",
        params,
      }),
      providesTags: ["doctorSchedule"],
    }),
    getMySchedules: builder.query({
      query: (params: Record<string, string | number | boolean | undefined>) => ({
        url: "/doctor-schedules/my-schedules",
        method: "GET",
        params,
      }),
      providesTags: ["doctorSchedule"],
    }),
    createDoctorSchedule: builder.mutation({
      query: (data) => ({
        url: "/doctor-schedules/create-doctor-schedule",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["doctorSchedule"],
    }),
    deleteDoctorSchedule: builder.mutation({
      query: (id: string) => ({
        url: `/doctor-schedules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["doctorSchedule"],
    }),
  }),
});

export const {
  useGetAllDoctorSchedulesQuery,
  useGetMySchedulesQuery,
  useCreateDoctorScheduleMutation,
  useDeleteDoctorScheduleMutation,
} = doctorScheduleApi;
