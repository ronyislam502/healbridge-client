import { baseApi } from "../../api/baseApi";

const prescriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPrescriptions: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/prescriptions/my-prescriptions",
        method: "GET",
        params: arg,
      }),
      providesTags: ["prescription"],
    }),
    getAllPrescriptions: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/prescriptions",
        method: "GET",
        params: arg,
      }),
      providesTags: ["prescription"],
    }),
    createPrescription: builder.mutation({
      query: (data) => ({
        url: "/prescriptions/create-prescription",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["prescription"],
    }),
  }),
});

export const {
  useGetMyPrescriptionsQuery,
  useGetAllPrescriptionsQuery,
  useCreatePrescriptionMutation,
} = prescriptionApi;
