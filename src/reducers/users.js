// import * as types from "../constants/ActionTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: []
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.concat({ name: action.payload.name, id: action.payload.id });
    },
    populateUsersList(state, action) {
      state.users = action.payload;
    }
  }
});

export const { addUser, populateUsersList } = usersSlice.actions;

export default usersSlice.reducer;

// Users Reducer
// const users = (state = [], action) => {
//   switch (action.type) {
//     case types.ADD_USER:
//       return state.concat([{ name: action.name, id: action.id }]);
//     case types.USERS_LIST:
//       return action.users;
//     default:
//       return state;
//   }
// };

// export default users;
