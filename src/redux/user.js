import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userColor: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const newState = { ...state, user: action.payload };
      return newState;
    },
    setUserColor: (state, action) => {
      const newState = { ...state, userColor: action.payload };
      return newState;
    },
    unsetUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, setUserColor, unsetUser } = userSlice.actions;

export default userSlice.reducer;
