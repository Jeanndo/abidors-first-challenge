import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});
