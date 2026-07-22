import { baseApi } from "../../api/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        const { image, ...bodyData } = data;
        formData.append("data", JSON.stringify(bodyData));
        if (image) formData.append("image", image);
        return {
          url: "/blogs/create-blog",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        const { image, ...bodyData } = data.body;
        formData.append("data", JSON.stringify(bodyData));
        if (image) formData.append("image", image);
        return {
          url: `/blogs/${data.id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["blog"],
    }),
    getAllBlogs: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/blogs",
        method: "GET",
        params: arg,
      }),
      providesTags: ["blog"],
    }),
    getBlogById: builder.query({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const { 
  useCreateBlogMutation, 
  useUpdateBlogMutation, 
  useGetAllBlogsQuery, 
  useGetBlogByIdQuery, 
  useDeleteBlogMutation 
} = blogApi;
