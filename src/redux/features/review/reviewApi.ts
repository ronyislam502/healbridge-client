import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/reviews",
        method: "GET",
        params: arg,
      }),
      providesTags: ["review"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: "/reviews/create-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
