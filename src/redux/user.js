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
      const newState = { userColor: action.payload.userColor, user: action.payload.user };
      return newState;
    },

    unsetUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
