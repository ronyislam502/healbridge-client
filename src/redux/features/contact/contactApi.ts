import { baseApi } from "../../api/baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => ({
        url: "/contact/submit-contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
    getAllContacts: builder.query({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
  }),
});

export const { useCreateContactMutation, useGetAllContactsQuery } = contactApi;
