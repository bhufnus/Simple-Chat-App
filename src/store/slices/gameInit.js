// import * as types from "../constants/ActionTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: ""
};

const gameState = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    }
  }
});

export const { setCurrentUser } = gameState.actions;

export default gameState.reducer;
