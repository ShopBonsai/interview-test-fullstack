import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

import {store, persistor} from "../src/redux/store"

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <PersistGate persistor={persistor}>
    <App />
  </PersistGate>
  </BrowserRouter>
 </Provider>,
  document.getElementById("root")
);
