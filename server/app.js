const socketio = require("socket.io");
const express = require("express");
const { buildWordSet } = require("./Controllers/words-controller");

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
let currentLevelIndex = 0;
let score = 0;

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
      case "canvas/resetCanvas":
        // TODO: the 'broadcast' part isn't really working. find out why
        socket.broadcast.emit(
          "drawing",
          JSON.stringify({
            type: "canvas/receiveResetCanvas"
          })
        );
        break;
      default:
        break;
    }
  });

  // WORD EVENTS
  socket.on("get-words", (data) => {
    let words = buildWordSet();
    const parsedData = JSON.parse(data);

    // probably don't need a switch
    switch (parsedData.type) {
      case "game/fetchWords":
        console.log("server fetch words");
        io.emit(
          "receive-words",
          JSON.stringify({
            type: "game/receiveWords",
            words: words
          })
        );
        break;
      default:
        break;
    }
  });

  socket.on("send-current-word", (data) => {
    const parsedData = JSON.parse(data);

    // probably don't need a switch. but kinda a janky way to type check
    switch (parsedData.type) {
      case "game/setCurrentWord":
        console.log("server set current word", parsedData);
        socket.broadcast.emit(
          "receive-current-word",
          JSON.stringify({
            type: "game/receiveCurrentWord",
            currentWord: parsedData.currentWord
          })
        );
        break;
      default:
        break;
    }
  });

  socket.on("next-question", (data) => {
    const parsedData = JSON.parse(data);
    console.log("server next question", parsedData);
    score += parsedData.score;
    currentLevelIndex++;
    // probably don't need a switch. but kinda a janky way to type check
    switch (parsedData.type) {
      case "game/nextQuestion":
        socket.broadcast.emit(
          "receive-next-question",
          JSON.stringify({
            type: "game/receiveNextQuestion",
            currentLevelIndex: currentLevelIndex,
            score: score++
          })
        );
        break;
      default:
        break;
    }
  });

  socket.on("disconnect", () => {
    // TODO: users list is not even working correctly
    users = users.filter((user) => user.socketId !== socket.id);

    console.log("User Disconnected", users);
    io.emit(
      "message",
      JSON.stringify({ type: "users/populateUsersList", users })
    );
  });
});

server.listen(8989);
