import { combineReducers } from "redux";
import messages from "./reducers/messages";
import users from "./reducers/users";

export default combineReducers({ messages, users });
