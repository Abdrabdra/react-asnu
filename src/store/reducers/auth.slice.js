import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    userId: null,
  },
  reducers: {
    logged: (state, action) => {
      state.isAuth = true;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { logged, logout } = authReducer.actions;

export default authReducer.reducer;
