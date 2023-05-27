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

        socket.emit(
          "message",
          JSON.stringify({
            type: "users/setCurrentUser",
            username: data.username
          })
        );
        io.emit(
          "message",
          JSON.stringify({ type: "users/populateUsersList", users })
        );
        break;
      }
      case "messages/addMessage":
        console.log("add message");
        io.emit(
          "message",
          JSON.stringify({ type: "messages/addMessage", users })
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

// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 8989 });

// const users = [];

// const broadcast = (data, ws) => {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN && client !== ws) {
//       client.send(JSON.stringify(data));
//     }
//   });
// };

// wss.on("connection", (ws) => {
//   let index;
//   ws.on("message", (message) => {
//     const data = JSON.parse(message);
//     switch (data.type) {
//       case "ADD_USER": {
//         index = users.length;
//         users.push({ name: data.name, id: index + 1 });
//         ws.send(JSON.stringify({ type: "USERS_LIST", users }));
//         broadcast({ type: "USERS_LIST", users }, ws);
//         break;
//       }
//       case "ADD_MESSAGE":
//         broadcast(
//           {
//             type: "ADD_MESSAGE",
//             message: data.message,
//             author: data.author
//           },
//           ws
//         );
//         break;
//       default:
//         break;
//     }
//   });

//   ws.on("close", () => {
//     users.splice(index, 1);
//     broadcast(
//       {
//         type: "USERS_LIST",
//         users
//       },
//       ws
//     );
//   });
// });
