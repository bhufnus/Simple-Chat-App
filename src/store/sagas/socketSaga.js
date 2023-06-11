import { eventChannel } from "redux-saga";
import { take, put, call, fork } from "redux-saga/effects";
import { addMessage, messageReceived } from "../slices/messages";
import username from "../../utils/name";

import { addUser, populateUsersList } from "../slices/users";
import { setCurrentUser } from "../slices/gameInit";
import { receiveLine, resetCanvas, receiveResetCanvas } from "../slices/canvas";

import io from "socket.io-client";
import { receiveWords } from "../slices/game";

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("message", (data) => {
      const parsedData = JSON.parse(data);
      switch (parsedData.type) {
        case messageReceived.type:
          emit(
            messageReceived({
              message: parsedData.message,
              author: parsedData.name,
              id: parsedData.id
            })
          );
          break;
        case addUser.type:
          emit(addUser(parsedData));
          //   emit(setCurrentUser(parsedData.username));
          break;
        case setCurrentUser.type:
          emit(setCurrentUser(parsedData.username));
          break;
        case populateUsersList.type:
          if (parsedData.users) {
            emit(populateUsersList(parsedData.users));
          }
          break;
        default:
          break;
      }
    });

    socket.on("drawing", (data) => {
      const parsedData = JSON.parse(data);
      switch (parsedData.type) {
        case receiveLine.type:
          emit(
            receiveLine({
              color: parsedData.color,
              width: parsedData.width,
              start: {
                x: parsedData.start.x,
                y: parsedData.start.y
              },
              // TODO: null checks are ratchet af
              end: {
                x: parsedData.end?.x,
                y: parsedData.end?.y
              }
            })
          );
          break;
        case receiveResetCanvas.type:
          console.log("received resetCanvas");
          emit(receiveResetCanvas());
          break;
        default:
          break;
      }
    });

    socket.on("receive-words", (data) => {
      const parsedData = JSON.parse(data);
      console.log("saga received words:", parsedData);
      emit(receiveWords(parsedData));
    });

    return () => {
      socket.off("message");
      socket.off("drawing");
    };
  });
}

export function* setupSocketSaga() {
  const socket = io("http://localhost:8989");
  const socketChannel = yield call(createSocketChannel, socket);

  // send new user to server
  socket.emit(
    "message",
    JSON.stringify({ type: addUser.type, name: username })
  );

  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

// import io from "socket.io-client";
// import { eventChannel } from "redux-saga";
// import { fork, take, call, put, cancel } from "redux-saga/effects";
// import { addUser } from "../slices/users";
// import { addMessage } from "../slices/messages";
// import { setCurrentUser } from "../slices/gameInit";
// import socket from "../../sockets/socket";

// function connect() {
//   //   const socket = io("http://localhost:8989");
//   return new Promise((resolve, reject) => {
//     socket.on("connect", () => {
//       console.log("SAGA SOCKET CONNECTED HEY");
//       resolve(socket);
//     });
//     // error handling not set up
//     socket.on("connect_error", (error) => {
//       reject(error);
//     });
//   });
// }

// function subscribe(socket) {
//   return eventChannel((emit) => {
//     socket.on("message", (data) => {
//       console.log("SAGA SOCKET DATA", data);
//       switch (data.type) {
//       }
//     });

//     return () => {
//       socket.off("users.login");
//       socket.off("users.logout");
//       socket.off("messages.new");
//       socket.off("disconnect");
//       socket.off("error");
//     };
//   });
// }

// function* read(socket) {
//   const channel = yield call(subscribe, socket);
//   while (true) {
//     console.log(channel);
//     let action = yield take(channel);
//     yield put(action);
//   }
// }

// function* write(socket) {
//   while (true) {
//     const { payload } = yield take(addMessage.type); // assuming `sendMessage` is an action creator
//     socket.emit("message", payload);
//   }
// }

// function* handleIO(socket) {
//   yield fork(read, socket);
//   yield fork(write, socket);
// }

// export function* flow() {
//   while (true) {
//     // get username if needed but it's useless rn
//     let { payload } = yield take(setCurrentUser.type);

//     let socket;
//     try {
//       socket = yield call(connect);
//       //   socket.emit(
//       //     "message",
//       //     JSON.stringify({ type: addUser.type, name: username })
//       //   );
//     } catch (error) {
//       console.log("Socket connection failed:", error);
//       // dispatch an action to handle the connection error
//       //   yield put(connectionError(error));
//       continue; // continue to the next iteration to wait for a login action again
//     }

//     const task = yield fork(handleIO, socket);

//     // let action = yield take(logout.type);
//     yield cancel(task);
//     socket.emit("logout");
//     socket.disconnect(); // disconnect the socket when the user logs out
//   }
// }
