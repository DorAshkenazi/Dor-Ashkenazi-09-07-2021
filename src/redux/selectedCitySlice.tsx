import { createSlice } from "@reduxjs/toolkit";
import City from "../models/City";

const initialState: City = {
  name: "Tel Aviv",
  country: "Israel",
  key: 215854,
};

const selectedCitySlice = createSlice({
  name: "selectedCity",
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.name = action.payload.name;
      state.country = action.payload.country;
      state.key = action.payload.key;
    },
  },
});

export const { setSelectedCity } = selectedCitySlice.actions;

export default selectedCitySlice.reducer;
