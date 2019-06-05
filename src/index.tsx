import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MusicKitController, MusicKitContext } from "./model/MusicKitController";

ReactDOM.render(
  <MusicKitContext.Provider value={new MusicKitController()}>
    <App />
  </MusicKitContext.Provider>,
  document.getElementById("root")
);
