import { all, call, takeEvery, put } from "redux-saga/effects";
import username from "../utils/name";
import socket from "../sockets/socket";
// import handleAddMessage from "./sagas/messages";
import handleNewSocketEvent, { setupSocketSaga } from "./sagas/socketSaga";
import { addMessage, messageReceived } from "./slices/messages";
import { addLine, resetCanvas } from "./slices/canvas";
import { addUser } from "./slices/users";
import { setCurrentUser } from "./slices/gameInit";
import { flow } from "./sagas/socketSaga";
import { fetchWords, nextQuestion, setCurrentWord } from "./slices/game";

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
}

function handleAddLine(action) {
  const { color, width, start, end } = action.payload;

  socket.emit(
    "drawing",
    JSON.stringify({
      type: addLine.type,
      color: color,
      width: width,
      start: {
        x: start.x,
        y: start.y
      },
      end: {
        x: end.x,
        y: end.y
      }
    })
  );
}
function handleResetCanvas() {
  console.log("SAGA clear canvas");
  socket.emit(
    "drawing",
    JSON.stringify({
      type: resetCanvas.type
    })
  );
}

function* handleFetchWords() {
  console.log("SAGA fetch words");
  socket.emit(
    "get-words",
    JSON.stringify({
      type: fetchWords.type
    })
  );
}

function* handleSetCurrentWord(action) {
  const currentWord = action.payload;
  console.log("SAGA set current word ");
  socket.emit(
    "send-current-word",
    JSON.stringify({
      type: setCurrentWord.type,
      currentWord: currentWord
    })
  );
}

function* handleNextQuestion(action) {
  console.log("next q saga", action.payload);
  const { score } = action.payload;
  socket.emit(
    "next-question",
    JSON.stringify({
      type: nextQuestion.type,
      score: score
    })
  );
}

function* watchNextQuestion() {
  yield takeEvery(nextQuestion.type, handleNextQuestion);
}

function* watchFetchWords(action) {
  yield takeEvery(fetchWords.type, handleFetchWords);
}

function* watchSetCurrentWord(action) {
  yield takeEvery(setCurrentWord.type, handleSetCurrentWord);
}

function* watchResetCanvas(action) {
  yield takeEvery(resetCanvas.type, handleResetCanvas);
}

function* watchAddLine() {
  yield takeEvery(addLine.type, handleAddLine);
}

export function* watchAddMessage() {
  yield takeEvery(addMessage.type, handleAddMessage);
}

export default function* rootSaga() {
  yield all([
    watchAddMessage(),
    setupSocketSaga(),
    watchAddLine(),
    watchResetCanvas(),
    watchFetchWords(),
    watchSetCurrentWord(),
    watchNextQuestion()
  ]);
}
