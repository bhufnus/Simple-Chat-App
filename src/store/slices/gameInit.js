import { createSlice } from "@reduxjs/toolkit";
import * as type from "../../utils/constants";

// DEV NOTE: change initial stage to modify starting point of app
const initialState = {
  currentUser: "",
  stage: type.GAME
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
    fetchWords(state, action) {
      state.stage = type.FETCHING_GAME;
    },
    // go to leaderboard
    finishGame(state, action) {
      state.stage = type.END_GAME;
    },
    cancelGame(state) {
      state.stage = type.START_GAME;
    },
    restartGame(state) {
      state.stage = type.START_GAME;
    }
  }
});

export const { setCurrentUser, cancelGame } = gameState.actions;

export default gameState.reducer;
