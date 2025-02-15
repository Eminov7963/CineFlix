import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Base_Url } from "../../constant/base";
import Cookies from "js-cookie";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Base_Url,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token"); // Token'i al
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Yetkilendirme ekle
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `/api/products`,
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query({
      query: (id) => `/api/products/${id}`,
      providesTags: ["Category"],
    }),
    deleteCategoryById: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
    postNewCategory: builder.mutation({
      query: (payload) => ({
        url: `/api/products`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Categories"],
    }),
    editCategory: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/api/products/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Categories", "Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useDeleteCategoryByIdMutation,
  usePostNewCategoryMutation,
  useEditCategoryMutation,
} = productsApi;
