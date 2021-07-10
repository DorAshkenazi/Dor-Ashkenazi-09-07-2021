import { createSlice } from "@reduxjs/toolkit";
import City from "../models/City";

const initialState: Array<City> = [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const isInFavoritesIndex = state.findIndex(
        (i) => i.key === action.payload.key
      );

      if (isInFavoritesIndex > -1) {
        state.splice(isInFavoritesIndex, 1);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
