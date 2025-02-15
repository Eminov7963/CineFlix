// features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        Cookies.set("token", action.payload);
      } else {
        Cookies.remove("token");
      }
    },
    logout: (state) => {
      state.token = null; // Token'ı null yapıyoruz
      Cookies.remove("token"); // Çerezi siliyoruz
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
