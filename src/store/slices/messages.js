import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: []
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action) {
      // use this as an empty action
      // state.messages.push(action.payload);
    },
    messageReceived(state, action) {
      state.messages.push(action.payload);
    }
  }
});

export const { addMessage, messageReceived } = messagesSlice.actions;

export default messagesSlice.reducer;
