import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MarkdownContent } from "./components";
import {
  MusicKitController,
  MusicKitContext
} from "./model/MusicKitController";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <MusicKitContext.Provider value={new MusicKitController()}>
    <Router>
      <Switch>
        <Route
          exact
          path="/privacy-policy"
          render={() => {
            const path = require("./assets/privacy-policy.md");
            return <MarkdownContent filePath={path} />;
          }}
        />
        <Route
          exact
          path="/terms-and-conditions"
          render={() => {
            const path = require("./assets/terms-and-conditions.md");
            return <MarkdownContent filePath={path} />;
          }}
        />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </MusicKitContext.Provider>,
  document.getElementById("root")
);
