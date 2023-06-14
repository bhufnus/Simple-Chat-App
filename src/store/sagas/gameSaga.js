import { take, race, delay, put } from "redux-saga/effects";
import { addMessage } from "../slices/game";
import { addMessageToChat } from "../slices/chat";
import { finishGame } from "../slices/gameInit";
import { answerQuestion, nextQuestion } from "../slices/game";
import { addUser } from "../slices/users";

function* answeringSaga() {
  for (let i = 0; i < 10; i++) {
    // yield take(addUser.type);
    // yield take(addMessageToChat.type);
    // UNCOMMENT TO CONTINUE TO NEXT QUESTION
    // yield put(nextQuestion());
  }
}

export default function* gameSaga() {
  while (true) {
    // time to answer
    yield race({
      delay: delay(6000000),
      done: answeringSaga()
    });
    yield put(finishGame());
  }
}
