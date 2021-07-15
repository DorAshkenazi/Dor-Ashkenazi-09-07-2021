import { createSlice } from "@reduxjs/toolkit";

interface SnackbarState {
  isOpen: boolean;
  message: string;
  color: string;
}

const initialState: SnackbarState = {
  isOpen: false,
  message: "",
  color: "green",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.color = action.payload.color;
    },
    closeSnackbar: (state) => {
      return (state = initialState);
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
