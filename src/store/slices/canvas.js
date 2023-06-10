import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lines: [
    {
      color: "#00000",
      start: null,
      end: null,
      width: null
    }
  ]
};

const drawingSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addLine(state, action) {
      // just a pathway to send the event through to the socket. but maybe it shouldn't be
      //   state.lines.push(action.payload);
    },
    receiveLine(state, action) {
      state.lines.push(action.payload);
    },
    resetCanvas(state, action) {
      Object.assign(state, initialState);
    },
    receiveResetCanvas(state, action) {
      Object.assign(state, initialState);
    }
  }

  //   name: "drawTool",
  //   initialState: {
  //     selection: "pencil",
  //     width: 0,
  //     color: "black"
  //   },
  //   reducers: {
  //     modifyTool(state, action) {
  //       state.drawTool = action.payload;
  //     }
  //   }
});

export const { addLine, receiveLine, resetCanvas, receiveResetCanvas } =
  drawingSlice.actions;

export default drawingSlice.reducer;
