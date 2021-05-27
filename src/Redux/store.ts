import { configureStore } from "@reduxjs/toolkit";
import { commonReducer } from "./Common/commonReducer";

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
