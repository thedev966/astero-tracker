import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  asteroid: null,
};

export const asteroidSlice = createSlice({
  name: "asteroid",
  initialState,
  reducers: {
    addCurrentAsteroid: (state, action) => {
      state.asteroid = action.payload;
    },
    removeCurrentAsteroid: (state, action) => {
      state.asteroid = {};
    },
  },
});

export const { addCurrentAsteroid, removeCurrentAsteroid } =
  asteroidSlice.actions;

export const selectCurrentAsteroid = (state) => state.asteroid.asteroid;

export default asteroidSlice.reducer;
