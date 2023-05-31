import { takeEvery } from "redux-saga/effects";
import { addMessage } from "../slices/messages";

// This is a saga. This actually sends our messages to the server
// (and then the server sends it back out to everyone else)
const handleNewMessage = function* handleNewMessage(params) {
  //   yield takeEvery(addMessage.type, (action) => {
  //     action.author = params.author ?? "hi";
  //     // send addMessage to server
  //     // params.socket.send(JSON.stringify(action));
  //   });
};

export default handleNewMessage;
