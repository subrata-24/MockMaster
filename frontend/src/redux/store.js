import { configureStore } from "@reduxjs/toolkit";

/*
  The imported "userSlice" variable is actually "userSlice.reducer" (the reducer function),not the entire slice object or the file itself.
  Since userSlice.js exports the reducer using "export default", we can import it with any name we choose (e.g., userSlice, userReducer, or any custom name).This is because default exports allow flexible naming during import, unlike named exports which require the exact exported name.
*/

import userSlice from "./userSlice.js";
import sessionSlice from "./sessionSlice.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    session: sessionSlice,
  },
});
