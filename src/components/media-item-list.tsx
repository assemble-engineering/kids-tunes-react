import React from "react";
import styled from "@emotion/styled";
import { SongCell } from ".";
import { MediaItem } from "../types";
import { MusicKitContext } from "../model/MusicKitController";

const Container = styled.section`
  width: 527px;
  margin: 31px auto;

  @media (max-width: 692px) {
    width: 340px;
  }
`;

const Loading = styled.p`
  display: block;
  text-align: center;
  font-family: Helvetica, sans-serif;
  color: #2e4d74;
  font-size: 18px;
  margin-top: 100px;
  animation: blinker 2s linear infinite;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

interface Props {
  mediaItems: MediaItem[];
}

interface State {
  nowPlayingItem?: MediaItem;
  isPlaying: boolean;
}

export default class MediaItemList extends React.Component<Props, State> {
  static contextType = MusicKitContext;

  constructor(props: Props) {
    super(props);
    this.mediaItemSelected = this.mediaItemSelected.bind(this);
  }

  async componentWillMount() {
    const instance = this.context.instance;
    const player = this.context.instance.player;
    const nowPlayingItem = player.nowPlayingItem;

    instance.addEventListener(
      window.MusicKit.Events.mediaItemDidChange,
      (event: any) => {
        this.setState({
          nowPlayingItem: event.item as MediaItem
        });
      }
    );

    instance.addEventListener(
      window.MusicKit.Events.playbackStateDidChange,
      () => {
        const player = this.context.instance.player;
        this.setState({ isPlaying: player.isPlaying });
      }
    );

    this.setState({ nowPlayingItem, isPlaying: player.isPlaying });
  }

  async mediaItemSelected(mediaItem: MediaItem) {
    this.context.mediaItemSelected(mediaItem);
  }

  public render() {
    const props = this.props;
    if (!props.mediaItems) {
      return <Loading>Loading...</Loading>;
    }
    const formatArtworkURL = this.context.musicKit.formatArtworkURL;

    const rows = props.mediaItems.map((mediaItem, i) => {
      const isFavorite = this.context.isMediaItemFavorite(mediaItem);
      const isNowPlayingItem = this.context.isMediaItemPlaying(mediaItem);
      return (
        <SongCell
          song={mediaItem}
          key={i}
          onMediaItemSelected={this.mediaItemSelected}
          formatArtworkURL={formatArtworkURL}
          isFavorite={isFavorite}
          isPlaying={this.state.isPlaying}
          isNowPlayingItem={isNowPlayingItem}
        />
      );
    });
    return <Container>{rows}</Container>;
  }
}
