const { cisecoApi } = require("../ciseco");

const categoryApi = cisecoApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new category
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/category/add-category",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: category,
      }),
      invalidatesTags: ["Product", "Entities", "Brand", "Category"],
    }),

    // get all categories
    getCategories: builder.query({
      query: () => ({
        url: "/category/list-categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // update category
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Category"],
    }),

    // get a category
    getCategory: builder.query({
      query: (id) => ({
        url: `/category/get-category/${id}`,
        method: "GET",
      }),

      providesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: ({ id, accessToken }) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} = categoryApi;
