import { baseApi } from "../../api/baseApi";

const appointmentApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyAppointments: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/appointments/my-appointments",
        method: "GET",
        params: arg,
      }),
      providesTags: ["appointment"],
    }),
    getAllAppointments: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/appointments",
        method: "GET",
        params: arg,
      }),
      providesTags: ["appointment"],
    }),
    createAppointment: builder.mutation({
      query: (data) => ({
        url: "/appointments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointment"],
    }),
  }),
});

export const {
  useGetMyAppointmentsQuery,
  useGetAllAppointmentsQuery,
  useCreateAppointmentMutation,
} = appointmentApi;
