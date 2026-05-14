import { baseApi } from "../../api/baseApi";

const userApi = baseApi?.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        // if (search) {
        //   params.append("searchTerm", search);
        // }
        // if (role) {
        //   params.append("role", role);
        // }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: (email: string) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    myProfil: builder.query({
      query: () => ({
        url: `/users/my-profile`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/users/update/${args?.id}`,
        method: "PATCH",
        body: args?.data,
      }),
      invalidatesTags: ["user"],
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: `/users/update-my-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-patient",
        method: "POST",
        body: userInfo,
      }),
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useGetSingleUserQuery,
  useMyProfilQuery,
  useUpdateUserMutation,
  useUpdateMyProfileMutation,
  useSignUpMutation,
  useCreateAdminMutation,
  useUpdateUserStatusMutation,
} = userApi;
