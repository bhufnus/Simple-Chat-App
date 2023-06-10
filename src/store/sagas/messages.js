// import { takeEvery } from "redux-saga/effects";
// import { addMessage } from "../slices/messages";

// // This is a saga. This actually sends our messages to the server
// // (and then the server sends it back out to everyone else)
// export function* handleAddMessage(socket) {
//   yield takeEvery(addMessage.type, (action) => {
//     const { message, name } = action.payload;
//     // action.author = params.author ?? "hi";
//     // send addMessage to server
//     // params.socket.send(JSON.stringify(action));
//     console.log("HI FROM SAGA", action.payload);

//     socket.emit("message", JSON.stringify(action.payload));

//     // socket.emit(
//     //   "message",
//     //   JSON.stringify({
//     //     type: addMessage.type,
//     //     message: inputRef.current.value,
//     //     name: currentUser
//     //   })
//     // );
//   });
// }

// export function* watchAddMessage() {
//   yield takeEvery(addMessage.type, handleAddMessage);
// }

// export default handleAddMessage;
