import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.slice";
import basketReducer from "./reducers/basket.slice";

export default configureStore({
  reducer: {
    auth: authReducer,
    basket: basketReducer,
  },
});
