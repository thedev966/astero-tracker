import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpened = true;
    },
    closeModal: (state, action) => {
      state.isOpened = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectIsOpenedModal = (state) => state.modal.isOpened;

export default modalSlice.reducer;
