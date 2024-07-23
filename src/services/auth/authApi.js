const { cisecoApi } = require("../ciseco");

const authApi = cisecoApi.injectEndpoints({
  endpoints: (builder) => ({
    // signup
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/user/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),

    // signin
    signin: builder.mutation({
      query: (userInfo) => ({
        url: "/user/signin",
        method: "POST",
        body: userInfo,
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/user/forgot-password",
        method: "PATCH",
        body: userInfo,
      }),
    }),

    // persist login
    persistLogin: builder.query({
      query: (accessToken) => ({
        url: "/user/me",
        method: "GET",
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ["User"],
    }),

    updateUserDetail: builder.mutation({
      query: ({ id, accessToken, userInfo }) => {
        return ({
          url: `/user/update-user-details/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: userInfo,
        })
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useForgotPasswordMutation,
  usePersistLoginQuery,
  useUpdateUserDetailMutation,
} = authApi;
