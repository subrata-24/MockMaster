import { createSlice } from "@reduxjs/toolkit";
import {} from "react-redux";

//A "slice" is a portion of Redux store that manages a specific piece of state.slice means portion.Think of Redux store as a cake.createSlice is a helper function that automatically generates action creators and action types, making Redux code much simpler
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

// Export the reducer function to add to your Redux store
export default userSlice.reducer;
