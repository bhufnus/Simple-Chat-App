const socketio = require("socket.io");
const express = require("express");

const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

let users = [];

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);
  let index;
  socket.on("message", (message) => {
    const data = JSON.parse(message);
    // console.log("server data", data);
    switch (data.type) {
      case "users/addUser":
        console.log("add user emit", data);
        index = users.length;
        // this id index method is shit
        users.push({ name: data.name, id: index + 1, socketId: socket.id });

        socket.emit(
          "message",
          JSON.stringify({
            type: "gameState/setCurrentUser",
            username: data.name
          })
        );

        io.emit(
          "message",
          JSON.stringify({ type: "users/populateUsersList", users })
        );
        break;

      case "messages/addMessage":
        console.log("add message");
        io.emit(
          "message",
          JSON.stringify({
            type: "messages/addMessage",
            users
          })
        );
        break;
      // case "gameState/setCurrentUser":
      //   socket.emit(
      //     "message",
      //     JSON.stringify({
      //       type: "gameState/setCurrentUser",
      //       username: data.username
      //     })
      //   );
      //   break;
      default:
        break;
    }
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);

    console.log("User Disconnected", users);
    io.emit(
      "message",
      JSON.stringify({ type: "users/populateUsersList", users })
    );
  });
});

server.listen(8989);
