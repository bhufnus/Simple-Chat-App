import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: []
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    messageReceived(state, action) {
      state.messages.concat(action.payload);
    }
    // export const messageReceived = (message, author) => ({
    //   type: types.MESSAGE_RECEIVED,
    //   id: nextMessageId++,
    //   message,
    //   author
    // });
  }
});

export const { addMessage, messageReceived } = messagesSlice.actions;

export default messagesSlice.reducer;
