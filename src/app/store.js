import { configureStore } from "@reduxjs/toolkit";
import asteroidReducer from "../features/asteroidSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
  reducer: {
    asteroid: asteroidReducer,
    modal: modalReducer,
  },
});
