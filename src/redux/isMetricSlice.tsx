import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = true;

const isMetricSlice = createSlice({
  name: "isMetric",
  initialState,
  reducers: {
    toggleMetric: (state) => {
      return state = !state;
    },
  },
});

export const { toggleMetric } = isMetricSlice.actions;

export default isMetricSlice.reducer;
