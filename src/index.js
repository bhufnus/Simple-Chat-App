import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleWare from "redux-saga";

import "./index.css";
import App from "./App";

import setupSocket from "./sockets/index";

import handleNewMessage from "./store/sagas/messages";
import username from "./utils/name";
import rootReducer from "./store/reducer";
import rootSaga from "./store/saga";

const sagaMiddleware = createSagaMiddleWare();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});
const socket = setupSocket(store.dispatch, username);
sagaMiddleware.run(rootSaga, { socket, username });

// export default store;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
