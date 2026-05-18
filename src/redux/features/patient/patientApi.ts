import { baseApi } from "../../api/baseApi";

const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPatients: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/patients",
        method: "GET",
        params: arg,
      }),
      providesTags: ["user"],
    }),
    getSinglePatient: builder.query({
      query: (id: string) => ({
        url: `/patients/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updatePatient: builder.mutation({
      query: (data) => ({
        url: `/patients/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deletePatient: builder.mutation({
      query: (id: string) => ({
        url: `/patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    createHealthData: builder.mutation({
      query: (data) => ({
        url: `/patients/health-data`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateHealthData: builder.mutation({
      query: (data) => ({
        url: `/patients/health-data`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    createMedicalReport: builder.mutation({
      query: (data) => ({
        url: `/patients/medical-report`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteMedicalReport: builder.mutation({
      query: (id: string) => ({
        url: `/patients/medical-report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllPatientsQuery,
  useGetSinglePatientQuery,
  useUpdatePatientMutation,
  useDeletePatientMutation,
  useCreateHealthDataMutation,
  useUpdateHealthDataMutation,
  useCreateMedicalReportMutation,
  useDeleteMedicalReportMutation,
} = patientApi;
