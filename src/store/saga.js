import { all, call, takeEvery, put } from "redux-saga/effects";
import username from "../utils/name";
import socket from "../sockets/socket";
// import handleAddMessage from "./sagas/messages";
import handleNewSocketEvent, { setupSocketSaga } from "./sagas/socketSaga";
import { addMessage, messageReceived } from "./slices/messages";
import { addUser } from "./slices/users";
import { setCurrentUser } from "./slices/gameInit";
import { flow } from "./sagas/socketSaga";

export function* handleAddMessage(action) {
  const { message, name } = action.payload;

  try {
    yield call(
      [socket, socket.emit],
      "message",
      JSON.stringify({
        type: addMessage.type,
        message: message,
        name: name
      })
    );
  } catch (error) {
    console.error("Socket emission error:", error);
  }

  // socket.emit("message", JSON.stringify(action.payload));

  // socket.emit(
  //   "message",
  //   JSON.stringify({
  //     type: addMessage.type,
  //     message: inputRef.current.value,
  //     name: currentUser
  //   })
  // );
}

export function* handleAddUser(action) {
  console.log("SAGA ADD USER", action.payload);

  const { name } = action.payload;
  try {
    yield call(
      [socket, socket.emit],
      "message",
      JSON.stringify({
        type: addUser.type,
        name: name
      })
    );
  } catch (error) {
    console.error("Socket emission error:", error);
  }
}

function* handleSetCurrentUser() {
  // yield put(setCurrentUser(username));
  yield put(addUser({ name: username }));
}

// TODO: not even sure if this is doing anything
export function* connectSocket() {
  try {
    console.log("connect socket");
    yield call(
      [socket, socket.on],
      "connection",
      JSON.stringify({ type: addUser.type, name: username })
    );
  } catch (error) {
    console.error("Socket emission error:", error);
  }
}

function* gameInit() {
  yield handleSetCurrentUser();
  yield connectSocket();
}

export function* watchAddUser() {
  yield takeEvery(addUser.type, handleAddUser);
}
export function* watchAddMessage() {
  yield takeEvery(addMessage.type, handleAddMessage);
}

export default function* rootSaga() {
  yield all([watchAddMessage(), watchAddUser(), gameInit(), setupSocketSaga()]);
}
