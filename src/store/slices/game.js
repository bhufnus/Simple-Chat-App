import { createSlice } from "@reduxjs/toolkit";

// TODO:
// add settings for number of players, maybe other settings

const initialState = {
  words: [],
  selectedWord: "",
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
      state.selectedWord = action.payload;
    },
    nextQuestion(state) {
      ++state.currentLevelIndex;
    },
    addScore(state, action) {
      state.score = state.score + action.payload.score;
    }
  }
});

export const {
  fetchWords,
  receiveWords,
  setCurrentWord,
  nextQuestion,
  addScore
} = gameSlice.actions;

export default gameSlice.reducer;
