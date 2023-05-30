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

const broadcast = (data, socket) => {
  socket.broadcast.emit("message", JSON.stringify(data));
};

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);
  let index;
  socket.on("message", (message) => {
    console.log(message);
    const data = JSON.parse(message);
    switch (data.type) {
      case "users/addUser": {
        console.log("add user emit");
        index = users.length;
        // this id index method is shit
        users.push({ name: data.name, id: index + 1, socketId: socket.id });

        io.emit(
          "message",
          JSON.stringify({ type: "users/populateUsersList", users })
        );

        // socket.emit(
        //   "message",
        //   JSON.stringify({
        //     type: "users/setCurrentUser",
        //     username: data.name
        //   })
        // );
        break;
      }
      case "messages/addMessage":
        console.log("add message");
        io.emit(
          "message",
          JSON.stringify({
            type: "messages/addMessage",
            users
          })
        );
        // broadcast(
        //   {
        //     type: "messages/addMessage",
        //     message: data.message,
        //     author: data.author
        //   },
        //   socket
        // );
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
    // broadcast(
    //   {
    //     type: "users/populateUsersList",
    //     users
    //   },
    //   socket
    // );
  });
});

server.listen(8989);
