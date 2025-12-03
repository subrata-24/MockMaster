import { createSlice } from "@reduxjs/toolkit";
import {} from "react-redux";

//A "slice" is a portion of Redux store that manages a specific piece of state.slice means portion.Think of Redux store as a cake.createSlice is a helper function that automatically generates action creators and action types, making Redux code much simpler
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    openAuthModal: false,
    currentPage: "login",
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOpenAuthModal: (state, action) => {
      state.openAuthModal = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setUserData, setOpenAuthModal, setCurrentPage } =
  userSlice.actions;

// Export the reducer function to add to your Redux store
export default userSlice.reducer;
