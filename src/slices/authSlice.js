import { createSlice } from "@reduxjs/toolkit";

let userInfo = null;

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("userInfo");
  userInfo = storedUser ? JSON.parse(storedUser) : null;
}

const initialState = {
  userInfo,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // persist
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
