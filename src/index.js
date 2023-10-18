import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import youtubeReducer from "./redux/youtubeSlice";
import flickrReducer from "./redux/flickrSlice";
import modalReducer from "./redux/modalSlice";
import menuReduver from "./redux/menuSlice";

const store = configureStore({
  reducer: {
    youtube: youtubeReducer,
    flickr: flickrReducer,
    modal: modalReducer,
    menu: menuReduver,
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
