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
let messageId = 880;

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

        // TODO: not sure if this needs to come to the server
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

      // TODO: this is sending the message back to the sender and resulting in duplicate messages.
      case "messages/addMessage":
        console.log("add message:", data);
        socket.broadcast.emit(
          "message",
          JSON.stringify({
            type: "messages/messageReceived",
            message: data.message,
            name: data.name,
            id: messageId++
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

  // DRAWING EVENTS
  socket.on("drawing", (drawing) => {
    const data = JSON.parse(drawing);

    switch (data.type) {
      case "canvas/addLine":
        // TODO: the 'broadcast' part isn't really working. find out why
        socket.broadcast.emit(
          "drawing",
          JSON.stringify({
            type: "canvas/receiveLine",
            color: data.color,
            width: data.width,
            start: { x: data.start.x, y: data.start.y },
            end: { x: data.end.x, y: data.end.y }
          })
        );
        break;
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
