import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),

    getAllUser: builder.query({
      query: () => ({
        url: `${USER_URL}`,
        credentials: "include",
      }),
    }),

    getUserById: builder.query({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
      }),
    }),

    userFollow: builder.mutation({
      query: (followingId) => ({
        url: `${USER_URL}/follow/${followingId}`,
        method: "POST",
      }),
    }),

    userUnfollow: builder.mutation({
      query: (unfollowingId) => ({
        url: `${USER_URL}/unfollow/${unfollowingId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useUserFollowMutation,
  useUserUnfollowMutation,
} = userApiSlice;
