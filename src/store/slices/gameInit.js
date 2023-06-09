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
    },
    startGame(state, action) {
      // at the start of the game, set the username and current stage
      state.username = action.payload.username; // TODO: take in user input
      //   state.stage = stages.FETCHING_GAME; // TODO: set up stage changing
    }
  }
});

export const { setCurrentUser } = gameState.actions;

export default gameState.reducer;
