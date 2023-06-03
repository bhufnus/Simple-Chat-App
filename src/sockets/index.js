// import * as types from "../constants/ActionTypes";
import { addMessage, messageReceived } from "../store/slices/messages";
import { addUser, populateUsersList } from "../store/slices/users";
import { setCurrentUser } from "../store/slices/gameInit";
import { receiveLine } from "../store/slices/canvas";
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

  socket.on("messages/addMessage");

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
        dispatch(
          messageReceived({
            message: parsedData.message,
            author: parsedData.name,
            id: parsedData.id
          })
        );
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

  socket.on("drawing", (data) => {
    const parsedData = JSON.parse(data);
    switch (parsedData.type) {
      case receiveLine.type:
        console.log("socket add line", parsedData);
        dispatch(
          receiveLine({
            color: parsedData.color,
            width: parsedData.width,
            start: {
              x: parsedData.start.x,
              y: parsedData.start.y
            },
            end: {
              x: parsedData.end?.x,
              y: parsedData.end?.y
            }
          })
        );
        break;
      default:
        break;
    }
  });

  return socket;
};

export default setupSocket;
