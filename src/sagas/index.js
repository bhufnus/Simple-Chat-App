import { takeEvery } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";

// This is a saga. This actually sends our messages to the server
// (and then the server sends it back out to everyone else)
const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, (action) => {
    action.author = params.username;
    params.socket.send(JSON.stringify(action));
  });
};

export default handleNewMessage;
