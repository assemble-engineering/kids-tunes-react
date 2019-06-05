import React from "react";
import { MusicKitContext, PlaylistType } from "../model/MusicKitController";
import { MediaItem } from "../types";
import { MediaItemList, PlaybackControls } from ".";

interface State {
  favorites: MediaItem[];
}

export default class Favorites extends React.Component<any, State> {
  static contextType = MusicKitContext;

  constructor(props: any) {
    super(props);
    this.state = { favorites: [] };
  }

  async componentWillMount() {
    this.setState({ favorites: this.context.favorites });
  }

  async componentDidMount() {
    const favorites = await this.context.updateFavorites();
    this.setState({ favorites });
  }

  render() {
    const mediaItems = this.state.favorites;
    return (
      <>
        <PlaybackControls playlistType={PlaylistType.favorites} />
        <MediaItemList mediaItems={mediaItems} />
      </>
    );
  }
}
