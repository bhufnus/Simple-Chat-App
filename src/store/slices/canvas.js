// import * as types from "../constants/ActionTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lines: [
    {
      start: null,
      end: null,
      ctx: null,
      width: null
    }
  ]
};

const drawingSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addLine(state, action) {
      state.lines.push(action.payload);
    }
  }
});

export const { addLine } = drawingSlice.actions;

export default drawingSlice.reducer;
