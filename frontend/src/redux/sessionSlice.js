import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    sessionData: [],
  },
  reducers: {
    setSessionData: (state, action) => {
      state.sessionData = action.payload;
    },
  },
});

export const { setSessionData } = sessionSlice.actions;
export default sessionSlice.reducer;
