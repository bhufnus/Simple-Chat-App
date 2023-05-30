// import * as types from "../constants/ActionTypes";
import { addMessage, messageReceived } from "../store/slices/messages";
import { addUser, populateUsersList } from "../store/slices/users";
import { setCurrentUser } from "../store/slices/gameInit";
// import { messageReceived } from "../Actions";

import io from "socket.io-client";

const setupSocket = (dispatch, username) => {
  const socket = io("http://localhost:8989");

  // send new user to server
  socket.on("connect", () => {
    // console.log("Client socket connected:", socket.connected);
    socket.emit(
      "message",
      JSON.stringify({ type: addUser.type, name: username }),
      () => {
        socket.emit(
          "message",
          JSON.stringify({ type: setCurrentUser.type, username })
        );
      }
    );
  });

  // receives messages from the server
  socket.on("message", (data) => {
    const parsedData = JSON.parse(data); // data is already a JSON object so don't need to parse. but it's here for safety
    console.log(parsedData);
    switch (parsedData.type) {
      case addMessage.type:
        console.log("socket add message", parsedData);
        dispatch(
          addMessage(parsedData.message, parsedData.author, parsedData.id)
        );
      case messageReceived.type:
        console.log("socket receive message", parsedData);
        dispatch(messageReceived(parsedData.message, parsedData.author));
        break;
      case addUser.type:
        console.log("socket add user");
        dispatch(addUser(parsedData));
        dispatch(setCurrentUser(parsedData.username));
        break;
      case setCurrentUser.type:
        console.log("socket set current user");
        dispatch(setCurrentUser(parsedData.username));
      case populateUsersList.type:
        console.log("socket populate user list");
        // TODO: this is a workaround for the server sending a populateUsersList without users attached. Should clean this up
        if (parsedData.users) {
          dispatch(populateUsersList(parsedData.users));
        }
        break;
      default:
        break;
    }
  });

  return socket;
};

export default setupSocket;

// import * as types from "../constants/ActionTypes";
// import { addUser, messageReceived, populateUsersList } from "../Actions";

// // passing in 'dispatch' allows us to make dispatch events
// const setupSocket = (dispatch, username) => {
//   const socket = new WebSocket("ws://localhost:8989");

//   // as soon as user connects, broadcast username to server,
//   // which will then send out to all people that there's a new user.
//   socket.onopen = () => {
//     socket.send(
//       JSON.stringify({
//         type: types.ADD_USER,
//         name: username
//       })
//     );
//   };

//   socket.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     switch (data.type) {
//       // when receiving a message from the server,
//       // dispatch that message to populate local messages
//       case types.ADD_MESSAGE:
//         dispatch(messageReceived(data.message, data.author));
//         // when receiving an added user event from the server
//         // add that user to your local list of users
//         break;
//       case types.ADD_USER:
//         dispatch(addUser(data.name));
//         break;
//       // populate users list
//       case types.USERS_LIST:
//         dispatch(populateUsersList(data.users));
//         break;
//       default:
//         break;
//     }
//   };
//   return socket;
// };

// export default setupSocket;
