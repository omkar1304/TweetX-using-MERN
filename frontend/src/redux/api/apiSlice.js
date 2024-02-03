import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["followingPosts", "users", "profileFollowers", "profileFollowing", "getUserById"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});
