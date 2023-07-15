import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

import GamePage from "./GamePage";
import FetchingPage from "./FetchingPage";
import EndGamePage from "./EndGamePage";
import * as stages from "../utils/constants";

import { cancelGame } from "../store/slices/gameInit";
import PreGamePage from "./PreGamePage";

const MainPage = () => {
  const currentStage = useSelector((state) => state.gameState.stage);
  const dispatch = useDispatch();

  let displayedPage;

  // This renders the visual components according to the games state
  switch (currentStage) {
    // case stages.PREGAME_LOBBY:
    // displayedPage = <PregameLobby />
    // break;
    case stages.START_GAME:
      displayedPage = <PreGamePage />;
      break;
    case stages.FETCHING_GAME:
      displayedPage = <FetchingPage />;
      break;
    case stages.GAME:
      displayedPage = <GamePage />;
      break;
    case stages.END_GAME:
      displayedPage = <EndGamePage />;
      break;
    default:
      break;
  }
  return (
    <div className="font-mono bg-sky-50 min-h-screen">
      <h1
        className="bg-sky-500 text-white p-4 text-2xl text-center uppercase"
        onClick={() => {
          dispatch(cancelGame());
        }}
      >
        Drawing Game
      </h1>
      {displayedPage}
    </div>
  );
};

export default MainPage;
