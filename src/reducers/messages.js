import * as types from "../constants/ActionTypes";
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
    }
  }
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

// // Messages reducer
// const messages = (state = [], action) => {
//   switch (action.type) {
//     case "ADD_MESSAGE":
//     case "MESSAGE_RECEIVED":
//       return state.concat([
//         {
//           message: action.message,
//           author: action.author,
//           id: action.id
//         }
//       ]);
//     default:
//       return state;
//   }
// };
// export default messages;
