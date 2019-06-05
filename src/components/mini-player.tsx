import React from "react";
import styled from "@emotion/styled";
import { MediaItem } from "../types";
import { MusicKitContext } from "../model/MusicKitController";

const Image = styled.img`
  position: fixed;
  bottom: 35px;
  right: 35px;
  border-radius: 10px;
  box-shadow: 0 0 27px 0 #b6b0c5;
  width: 125px;
  height: 125px;
  cursor: pointer;
`;

interface Props {
  onOpen: () => void;
  nowPlayingItem?: MediaItem;
}

export default class MiniPlayer extends React.Component<Props> {
  static contextType = MusicKitContext;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const nowPlayingItem = this.props.nowPlayingItem as MediaItem;
    if (!nowPlayingItem) {
      return <></>;
    }

    const artworkURL = this.context.musicKit.formatArtworkURL(
      nowPlayingItem.attributes.artwork,
      "125",
      "125"
    );
    return (
      <Image src={artworkURL} alt="Album artwork" onClick={this.props.onOpen} />
    );
  }
}
