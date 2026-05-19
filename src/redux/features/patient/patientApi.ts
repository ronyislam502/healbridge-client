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

    createPatientHealthData: builder.mutation({
      query: (data) => ({
        url: `/patients/health-data`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user", "patient"],
    }),
    updatePatientHealthData: builder.mutation({
      query: (data) => ({
        url: `/patients/health-data`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user", "patient"],
    }),
    createMedicalReport: builder.mutation({
      query: (data) => ({
        url: `/patients/medical-report`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user", "patient"],
    }),
    deleteMedicalReport: builder.mutation({
      query: (id: string) => ({
        url: `/patients/medical-report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user", "patient"],
    }),
  }),
});

export const {
  useGetAllPatientsQuery,
  useGetSinglePatientQuery,

  useCreatePatientHealthDataMutation,
  useUpdatePatientHealthDataMutation,
  useCreateMedicalReportMutation,
  useDeleteMedicalReportMutation,
} = patientApi;
