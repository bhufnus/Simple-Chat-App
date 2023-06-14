// import * as types from "../constants/ActionTypes";
import { createSlice } from "@reduxjs/toolkit";

// Possible game states  TODO: move to separate file?
const START_GAME = "START_GAME";
const GAME = "GAME";
const FETCHING_GAME = "FETCHING_GAME";
const END_GAME = "END_GAME";
const CHAT = "CHAT";

const initialState = {
  currentUser: "",
  stage: START_GAME
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
    },
    // go to leaderboard
    finishGame(state, action) {
      state.stage = END_GAME;
    },
    cancelGame(state) {
      state.stage = START_GAME;
    },
    restartGame(state) {
      state.stage = START_GAME;
    }
  }
});

export const { setCurrentUser } = gameState.actions;

export default gameState.reducer;
