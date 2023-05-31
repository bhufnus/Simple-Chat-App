import { all } from "redux-saga/effects";

import handleNewMessage from "./sagas/messages";

export default function* rootSaga() {
  yield all([handleNewMessage()]);
}
