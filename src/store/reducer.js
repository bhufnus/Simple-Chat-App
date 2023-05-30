import { combineReducers } from "redux";
import messages from "./slices/messages";
import users from "./slices/users";

export default combineReducers({ messages, users });
