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
      query: ({ id, data }) => ({
        url: `/patients/update/${id}`,
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
  }),
});

export const {
  useGetAllPatientsQuery,
  useGetSinglePatientQuery,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApi;
