const { cisecoApi } = require("../ciseco");

const storeApi = cisecoApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new store
    addStore: builder.mutation({
      query: (store) => ({
        url: "/store/add-store",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: store,
      }),
    }),

    // get all stores
    getStores: builder.query({
      query: () => ({
        url: "/store/list-stores",
        method: "GET",
      }),

      providesTags: ["Store"],
    }),

    // update store
    updateStore: builder.mutation({
      query: ({ id, body }) => ({
        url: `/store/update-store/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Store"],
    }),

    // get a store
    getStore: builder.query({
      query: (id) => ({
        url: `/store/get-store/${id}`,
        method: "GET",
      }),

      providesTags: ["Store"],
    }),
  }),
});

export const {
  useAddStoreMutation,
  useGetStoresQuery,
  useUpdateStoreMutation,
  useGetStoreQuery,
} = storeApi;
