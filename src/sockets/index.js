import * as types from "../constants/ActionTypes";
import { addUser, messageReceived, populateUsersList } from "../Actions";

// passing in 'dispatch' allows us to make dispatch events
const setupSocket = (dispatch, username) => {
  const socket = new WebSocket("ws://localhost:8989");

  // as soon as user connects, broadcast username to server,
  // which will then send out to all people that there's a new user.
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: types.ADD_USER,
        name: username
      })
    );
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      // when receiving a message from the server,
      // dispatch that message to populate local messages
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author));
        // when receiving an added user event from the server
        // add that user to your local list of users
        break;
      case types.ADD_USER:
        dispatch(addUser(data.name));
        break;
      // populate users list
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users));
        break;
      default:
        break;
    }
  };
  return socket;
};

export default setupSocket;
