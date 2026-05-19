import { TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { TDoctor } from "@/types/user";

const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctor: builder.mutation({
      query: (data) => ({
        url: "/users/create-doctor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getAllDoctors:builder.query({
      query: ({ search, sort, page, limit, specialty, minAppointmentFee, maxAppointmentFee }) => {
        const params = new URLSearchParams();

        if (search) {
          params.append("searchTerm", search);
        }
        if (specialty) {
          params.append("specialties", specialty);
        }
        if (sort) {
          const sortMapping: Record<string, { sortBy: string; sortOrder: string }> = {
            rating: { sortBy: "rating", sortOrder: "desc" },
            fee_low: { sortBy: "appointmentFee", sortOrder: "asc" },
            fee_high: { sortBy: "appointmentFee", sortOrder: "desc" },
            exp: { sortBy: "experience", sortOrder: "desc" },
          };

          const mapping = sortMapping[sort];
          if (mapping) {
            params.append("sortBy", mapping.sortBy);
            params.append("sortOrder", mapping.sortOrder);
          }
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/doctors",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
      transformResponse: (response: TResponseRedux<TDoctor[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    getSingleDoctor: builder.query({
      query: (id: string) => ({
        url: `/doctors/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TDoctor>) => response.data,
      providesTags: ["user"],
    }),
    updateDoctor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/doctors/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateDoctorSpecialties: builder.mutation({
      query: ({ id, data }) => ({
        url: `/doctors/include-specialties/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteDoctor: builder.mutation({
      query: (id: string) => ({
        url: `/doctors/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    getAIDoctorSuggestion: builder.mutation({
      query: (data: { symptoms: string }) => ({
        url: "/doctors/suggestion",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorsQuery,
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
  useUpdateDoctorSpecialtiesMutation,
  useDeleteDoctorMutation,
  useGetAIDoctorSuggestionMutation,
} = doctorApi;
