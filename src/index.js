import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import createSagaMiddleWare from "redux-saga";

import "./index.css";
import App from "./App";

import setupSocket from "./sockets/index";
import reducers from "./reducers";
import handleNewMessage from "./sagas";
import username from "./utils/name";

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

const socket = setupSocket(store.dispatch, username);

sagaMiddleware.run(handleNewMessage, { socket, username });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
