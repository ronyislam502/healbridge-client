import { baseApi } from "../../api/baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSpecialty: builder.mutation({
      query: (data) => ({
        url: "/specialties/create-specialties",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["schedule"],
    }),
    getAllSpecialties: builder.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: ["schedule"],
    }),
    updateSpecialty: builder.mutation({
      query: ({ id, data }) => ({
        url: `/specialties/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["schedule"],
    }),
    deleteSpecialty: builder.mutation({
      query: (id: string) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["schedule"],
    }),
  }),
});

export const {
  useCreateSpecialtyMutation,
  useGetAllSpecialtiesQuery,
  useUpdateSpecialtyMutation,
  useDeleteSpecialtyMutation,
} = specialtiesApi;

