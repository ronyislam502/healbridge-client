import { baseApi } from "../../api/baseApi";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: (data) => ({
        url: "/schedules/create-schedule",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["schedule"],
    }),
    getAllSchedules: builder.query({
      query: (arg: Record<string, string | number | boolean | undefined>) => ({
        url: "/schedules",
        method: "GET",
        params: arg,
      }),
      providesTags: ["schedule"],
    }),
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `/schedules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["schedule"],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,
} = scheduleApi;
