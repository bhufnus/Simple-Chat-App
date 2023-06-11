import { combineReducers } from "redux";
import messages from "./slices/messages";
import users from "./slices/users";
import gameState from "./slices/gameInit";
import canvas from "./slices/canvas";
import game from "./slices/game";

export default combineReducers({ messages, users, gameState, canvas, game });
