import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://healbridge-server.vercel.app/api/v1" }), // Placeholder URL
  tagTypes: ["User", "Doctor", "Patient", "Appointment"],
  endpoints: () => ({}),
});
