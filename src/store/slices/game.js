import { createSlice } from "@reduxjs/toolkit";

// TODO:
// add settings for number of players, maybe other settings

const initialState = {
  words: [],
  currentWord: "",
  currentLevelIndex: 0,
  score: 0
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // initialize game state upon word fetch success
    fetchWords(state, action) {},
    receiveWords(state, action) {
      const { words } = action.payload;
      state.words = words;
    },
    setCurrentWord(state, action) {
      //   state.currentWord = action.payload;
    },
    receiveCurrentWord(state, action) {
      state.currentWord = action.payload;
    },
    nextQuestion(state, action) {
      //   const score = action.payload;
      //   ++state.currentLevelIndex;
      //   state.score += score;
    },

    // TODO: handle addScore in the nextQuestion action
    receiveNextQuestion(state, action) {
      const { currentLevelIndex, score } = action.payload;
      state.currentLevelIndex = currentLevelIndex;
      state.score = score;
    },
    // TODO: not currently doing anything but leaving it for now
    addScore(state, action) {
      state.score = state.score + action.payload.score;
    }
  }
});

export const {
  fetchWords,
  receiveWords,
  setCurrentWord,
  receiveCurrentWord,
  nextQuestion,
  receiveNextQuestion,
  addScore
} = gameSlice.actions;

export default gameSlice.reducer;
