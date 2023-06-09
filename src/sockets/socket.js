import io from "socket.io-client";
import { addUser, populateUsersList } from "../store/slices/users";
import { setCurrentUser } from "../store/slices/gameInit";

const socket = io("http://localhost:8989");

// socket.on("connect", () => {
//   console.log("Client socket connected:", socket.connected);
//   socket.emit("message", JSON.stringify({ type: addUser.type, name: "name" }));
// });

export default socket;
