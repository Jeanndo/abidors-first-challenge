import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
  },
  reducers: {
    createUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    UserDetails: (state, action) => {
      state.user = action.payload;
    },
    getUsers: (state, action) => {
      state.users = [...action.payload];
    },
  },
});

export const { createUser, getUsers, updateUser, UserDetails } =
  userSlice.actions;

export default userSlice;
