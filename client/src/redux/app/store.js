import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../services/product";
import { tvApi } from "../services/tvApi"; // 📌 TV API'yi ekledik
import authReducer from "../features/authSlice";
import wishListSlice from "../features/wishlistSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishListSlice,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [tvApi.reducerPath]: tvApi.reducer, // 📌 TV API için reducer ekledik
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, tvApi.middleware), // 📌 TV API middleware ekledik
});

setupListeners(store.dispatch);
