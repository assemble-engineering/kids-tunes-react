import React from "react";
import styled from "@emotion/styled";
// import "./App.css";
import "./reset.css";
import { MusicKitContext } from "./model/MusicKitController";
import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  Header,
  TopMusic,
  Favorites,
  FullPlayer,
  MiniPlayer,
  Account,
  Landing
} from "./components";

import { MediaItem } from "./types";

const Main = styled.main`
  background-color: #f8f7fb;
  padding-top: 60px;
  height: 100%;
  min-height: calc(100vh - 60px);
`;

interface State {
  isPlayerOpen: boolean;
  isUserAuthorized: boolean;
  nowPlayingItem?: MediaItem;
}

export default class App extends React.Component<any, State> {
  static contextType = MusicKitContext;

  constructor(props: any) {
    super(props);
    this.userDidClosePlayer = this.userDidClosePlayer.bind(this);
    this.userDidOpenPlayer = this.userDidOpenPlayer.bind(this);
    this.renderApplication = this.renderApplication.bind(this);
    this.authorizationStatusDidChange = this.authorizationStatusDidChange.bind(
      this
    );
    this.state = {
      isPlayerOpen: false,
      isUserAuthorized: false
    };
  }

  async componentWillMount() {
    this.startListeningForEvents();
    await this.authorizationStatusDidChange();
  }

  startListeningForEvents() {
    const instance = this.context.instance;
    instance.addEventListener(
      window.MusicKit.Events.mediaItemDidChange,
      ({ item }: any) => {
        this.setState({ nowPlayingItem: item });
      }
    );
    instance.addEventListener(
      window.MusicKit.Events.authorizationStatusDidChange,
      this.authorizationStatusDidChange
    );
  }

  async authorizationStatusDidChange() {
    const instance = this.context.instance;
    const isUserAuthorized = instance.isAuthorized;
    this.setState({ isUserAuthorized });

    if (isUserAuthorized) {
      await this.context.configureApplication();
    }
  }

  userDidClosePlayer() {
    this.setState({ isPlayerOpen: false });
  }

  userDidOpenPlayer() {
    this.setState({ isPlayerOpen: true });
  }

  private renderApplication() {
    return (
      <Router>
        <Header />
        {this.state.isPlayerOpen && (
          <FullPlayer onClose={this.userDidClosePlayer} />
        )}
        <Main>
          <MiniPlayer
            onOpen={this.userDidOpenPlayer}
            nowPlayingItem={this.state.nowPlayingItem}
          />
          <Route exact path="/" component={TopMusic} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/player" component={FullPlayer} />
        </Main>
      </Router>
    );
  }

  public render() {
    const isUserAuthorized = this.state.isUserAuthorized;
    return isUserAuthorized ? this.renderApplication() : <Landing />;
  }
}
