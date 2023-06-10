import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { startGame } from "../store/slices/gameInit";
import { addUser, populateUsersList } from "../store/slices/users";
import Button from "../components/Button";
import io from "socket.io-client";

// CODE TAKEN FROM DRAWING PROJECT
function StartGamePage() {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();

  // dispatch socket event to saga from here
  const socket = io("http://localhost:3001");

  const startGameHandler = () => {
    if (username.trim() !== "") {
      // TODO: check for duplicate users
      // DON'T EMIT THIS HERE, HANDLE IN MIDDLEWARE
      // socket.emit("add-user", username);
      console.log(startGame.type);
      dispatch(addUser({ username }));
      // send username to keep track of who is current player in game state
      // TODO: ADD STARTGAME TO GAMEINIT SLICE
      dispatch(startGame({ username }));
    }
  };
  return (
    <div className="">
      <form
        onSubmit={startGameHandler}
        className="flex flex-col justify-center items-center mt-80"
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Nickname"
          className="py-2 px-4 outline-none rounded shadow w-64 mb-6"
        />
        <Button onClick={startGameHandler}>Start Game</Button>
      </form>
    </div>
  );
}

export default StartGamePage;
