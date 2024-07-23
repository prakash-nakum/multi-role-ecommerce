const { cisecoApi } = require("../ciseco");

const userApi = cisecoApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all users
    getUsers: builder.query({
      query: (accessToken) => {
        return ({
          url: "/user/list-users",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },

        })
      },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, accessToken, body }) => {
        return ({
          url: `/user/update-user/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body,
        })
      },
      invalidatesTags: ["User"],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, accessToken, body }) => {
        return ({
          url: `/user/update-user-role/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body,
        })
      },
      invalidatesTags: ["User"],
    }),


    razorPay: builder.mutation({
      query: ({ body }) => {
        return ({
          url: `/payment/razorpay/razorpayverify`,
          method: "POST",
          body,
        })
      },
      invalidatesTags: ["User"],
    }),

    codPay: builder.mutation({
      query: ({ body }) => {
        return ({
          url: `/payment/cod`,
          method: "POST",
          body,
        })
      },
      invalidatesTags: ["User"],
    }),


  }),
});



export const { useGetUsersQuery, useUpdateUserMutation, useRazorPayMutation, useCodPayMutation, useUpdateUserRoleMutation } = userApi;

