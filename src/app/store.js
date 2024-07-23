import { configureStore } from "@reduxjs/toolkit";
import { cisecoApi } from "../services/ciseco";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "@/features/auth/authSlice";
import loginSlice from "@/features/auth/accesstokenSlice";
import productFilterSlice from "@/features/productFilter/productFilterSlice";

export const store = configureStore({
  reducer: {
    [cisecoApi.reducerPath]: cisecoApi.reducer,
    auth: authSlice,
    productFilter: productFilterSlice,
    accesstoken: loginSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cisecoApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
