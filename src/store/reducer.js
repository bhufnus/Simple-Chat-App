import { combineReducers } from "redux";
import messages from "./slices/messages";
import users from "./slices/users";
import gameState from "./slices/gameInit";

export default combineReducers({ messages, users, gameState });
