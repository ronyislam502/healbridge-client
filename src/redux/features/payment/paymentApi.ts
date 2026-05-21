import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/payment",
        method: "GET",
        params: arg,
      }),
      providesTags: ["payment" as any], // Adding type cast in case tag is not explicitly declared in baseApi
    }),
    getMyPayments: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/payment/my-payments",
        method: "GET",
        params: arg,
      }),
      providesTags: ["payment" as any],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetMyPaymentsQuery,
} = paymentApi;
