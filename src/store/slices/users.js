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
    // TODO: eventually move this into a gameInit slice
    // setCurrentUser(state, action) {
    //   state.currentUser = action.payload;
    // }
  }
});

export const { addUser, populateUsersList } = usersSlice.actions;

export default usersSlice.reducer;
