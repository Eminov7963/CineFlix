import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Base_Url } from "../../constant/base";
import Cookies from "js-cookie";

export const tvApi = createApi({
  reducerPath: "tvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Base_Url,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTvShows: builder.query({
      query: () => `/api/tv`,
      providesTags: ["TvShows"],
    }),
    getTvShowById: builder.query({
      query: (id) => `/api/tv/${id}`,
      providesTags: ["TvShow"],
    }),
    deleteTvShowById: builder.mutation({
      query: (id) => ({
        url: `/api/tv/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TvShows"],
    }),
    postNewTvShow: builder.mutation({
      query: (payload) => ({
        url: `/api/tv`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["TvShows"],
    }),
    editTvShow: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/api/tv/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["TvShows", "TvShow"],
    }),
  }),
});

export const {
  useGetAllTvShowsQuery,
  useGetTvShowByIdQuery,
  useDeleteTvShowByIdMutation,
  usePostNewTvShowMutation,
  useEditTvShowMutation,
} = tvApi;
