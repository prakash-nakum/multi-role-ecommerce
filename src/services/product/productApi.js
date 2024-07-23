const { cisecoApi } = require("../ciseco");

const productApi = cisecoApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new product
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/product/add-product",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: product,
      }),
      invalidatesTags: ["Product", "Entities", "Brand", "Category"],
    }),

    
    // get all products
    getProducts: builder.query({
      query: () => ({
        url: "/product/list-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // update product
    updateProduct: builder.mutation({
      query: ({ id, body, accessToken }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      }),
      invalidatesTags: ["Product", "Brand", "Category"],
    }),

    // get a single product
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/get-product/${id}`,
        method: "GET",
      }),

      providesTags: ["Product"],
    }),

    // filtered products
    getFilteredProducts: builder.mutation({
      query: (body) => ({
        url: "/product/filtered-products",
        method: "POST",
        body,
      }),

      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: ({ id, accessToken }) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductQuery,
  useGetFilteredProductsMutation,
  useDeleteProductMutation,
} = productApi;
