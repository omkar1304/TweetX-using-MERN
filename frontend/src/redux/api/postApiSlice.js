import { apiSlice } from "./apiSlice";
import { POST_URL } from "../constants";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["followingPosts"],
    }),

    updatePost: builder.mutation({
      query: ({ postId, data }) => ({
        url: `${POST_URL}/${postId}`,
        method: "PUT",
        body: data,
      }),
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POST_URL}/${postId}`,
        method: "DELETE",
      }),
    }),

    getAllUserPosts: builder.query({
      query: () => ({
        url: `${POST_URL}`,
      }),
    }),

    getPostById: builder.query({
      query: (postId) => ({
        url: `${POST_URL}/${postId}`,
      }),
    }),

    getAllPostsFromFollowing: builder.query({
      query: (page) => ({
        url: `${POST_URL}/followingposts?page=${page}`,
      }),
      providesTags: ["followingPosts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAllUserPostsQuery,
  useGetPostByIdQuery,
  useGetAllPostsFromFollowingQuery,
} = postApiSlice;
