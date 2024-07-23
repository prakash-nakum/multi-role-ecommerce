const { cisecoApi } = require("../ciseco");

const brandApi = cisecoApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new brand
    addBrand: builder.mutation({
      query: (brand) => ({
        url: "/brand/add-brand",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: brand,
      }),
      invalidatesTags: ["Product", "Entities", "Brand", "Category"],
    }),

    // get all brands
    getBrands: builder.query({
      query: () => ({
        url: "/brand/list-brands",
        method: "GET",
      }),

      providesTags: ["Brand"],
    }),

    // update brand
    updateBrand: builder.mutation({
      query: ({ id, body }) => ({
        url: `/brand/update-brand/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Brand"],
    }),

    // get a brand
    getBrand: builder.query({
      query: (id) => ({
        url: `/brand/get-brand/${id}`,
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    deleteBrand: builder.mutation({
      query: ({ id, accessToken }) => ({
        url: `/brand/delete-brand/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useAddBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
  useGetBrandQuery,
  useDeleteBrandMutation,
} = brandApi;
