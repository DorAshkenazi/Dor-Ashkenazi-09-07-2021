// Redux
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import selectedCityReducer from "./selectedCitySlice";
import isMetricReducer from "./isMetricSlice";

export default configureStore({
  reducer: {
    favorites: favoritesReducer,
    selectedCity: selectedCityReducer,
    isMetric: isMetricReducer
  },
});
