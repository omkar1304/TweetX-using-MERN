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
      invalidatesTags: [
        "users",
        "followingPosts",
      ],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "users",
        "followingPosts",
      ],
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
      providesTags: ["users"],
    }),

    getUserById: builder.query({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
      }),
      providesTags: ["getUserById"],
    }),

    getProfilePosts: builder.query({
      query: (profileId) => ({
        url: `${USER_URL}/posts/${profileId}`,
      }),
    }),

    getProfileFollowers: builder.query({
      query: (profileId) => ({
        url: `${USER_URL}/followers/${profileId}`,
      }),
      providesTags: ["profileFollowers"],
    }),

    getProfileFollowing: builder.query({
      query: (profileId) => ({
        url: `${USER_URL}/following/${profileId}`,
      }),
      providesTags: ["profileFollowing"],
    }),

    userFollow: builder.mutation({
      query: (followingId) => ({
        url: `${USER_URL}/follow/${followingId}`,
        method: "PUT",
      }),
      invalidatesTags: [
        "users",
        "profileFollowers",
        "profileFollowing",
        "getUserById",
        "followingPosts"
      ],
    }),

    userUnfollow: builder.mutation({
      query: (unfollowingId) => ({
        url: `${USER_URL}/unfollow/${unfollowingId}`,
        method: "PUT",
      }),
      invalidatesTags: [
        "users",
        "profileFollowers",
        "profileFollowing",
        "getUserById",
        "followingPosts"
      ],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useGetProfilePostsQuery,
  useGetProfileFollowersQuery,
  useGetProfileFollowingQuery,
  useUserFollowMutation,
  useUserUnfollowMutation,
} = userApiSlice;
