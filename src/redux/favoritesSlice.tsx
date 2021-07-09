import { createSlice } from "@reduxjs/toolkit";
import Favorite from "../models/Favorite";

const initialState: Array<Favorite> = [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action) => {
      let index = state.findIndex((i) => i.id === action.payload.id);
      state.splice(index, 1);
    }
  },
});

export const { addFavorite, removeFavorite } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
