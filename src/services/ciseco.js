import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const TIMEOUT_LIMIT = 3000;

export const cisecoApi = createApi({
  reducerPath: "cisecoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    // timeout: TIMEOUT_LIMIT
  }),
  tagTypes: ["User", "Product", "Brand", "Category"],
  endpoints: () => ({}),
});

