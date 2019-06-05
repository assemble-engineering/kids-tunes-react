import React from "react";
import { MediaItem } from "../types";
import { MediaItemList, PlaybackControls } from ".";
import { MusicKitContext, PlaylistType } from "../model/MusicKitController";

interface State {
  topSongs: MediaItem[];
}

export default class TopSongs extends React.Component<any, State> {
  static contextType = MusicKitContext;

  constructor(props: any) {
    super(props);
    this.state = { topSongs: [] };
  }

  async componentWillMount() {
    this.setState({ topSongs: this.context.topSongs });
  }

  async componentDidMount() {
    const topSongs = await this.context.updateTopSongs();
    this.setState({ topSongs });
  }

  render() {
    const mediaItems = this.state.topSongs;
    return (
      <>
        <PlaybackControls playlistType={PlaylistType.topSongs} />
        <MediaItemList mediaItems={mediaItems} />
      </>
    );
  }
}
