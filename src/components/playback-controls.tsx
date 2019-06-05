import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as PlayIcon } from "../assets/play.svg";
import { ReactComponent as ShuffleIcon } from "../assets/shuffle.svg";
import { MusicKitContext, PlaylistType } from "../model/MusicKitController";

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 45px;
`;

const PlayButtonContent = styled(PlayIcon)`
  margin: 0 0 0 5px;
  width: 24px;
  height: 33px;
`;

const ShuffleButtonContent = styled(ShuffleIcon)`
  width: 47px;
  height: 34px;
`;

const PlayPauseButton = styled.div`
  width: 92px;
  height: 92px;
  background-image: linear-gradient(to bottom, #94beff, #69a1f9);
  border-radius: 100%;
  box-shadow: 0 2px 13px 0 rgba(113, 166, 250, 0.3);
  margin-right: 75px;
  cursor: pointer;
  display: flex;
  fill: white;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0 2px 13px 0 rgba(113, 166, 250, 0.52);
    background-image: linear-gradient(to bottom, #9ec4ff, #81b0fa);
    -webkit-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }
`;

const ShuffleButton: React.SFC<any> = styled.div`
  width: 92px;
  height: 92px;
  box-shadow: 0 2px 13px 0 rgba(185, 215, 133, 0.3);
  background-image: ${props => {
    if (props.isOn) {
      return "linear-gradient(to bottom, #fdd66b, #f0be31);";
    }
    return "linear-gradient(to bottom, #94beff, #69a1f9)";
  }};

  border-radius: 100%;
  cursor: pointer;
  display: flex;
  fill: white;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0 2px 13px 0 rgba(185, 215, 133, 0.46);
    background-image: linear-gradient(to bottom, #ffdb7a, #f9cd52);
    -webkit-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }
`;

interface Props {
  playlistType: PlaylistType;
}

interface State {
  isPlaying: boolean;
}

export default class PlaybackControls extends React.Component<Props, State> {
  static contextType = MusicKitContext;

  constructor(props: Props) {
    super(props);
    this.state = { isPlaying: false };
    this.togglePlayPause = this.togglePlayPause.bind(this);
  }

  componentWillMount() {
    const instance = this.context.instance;
    this.setState({ isPlaying: instance.player.isPlaying });
  }

  async togglePlayPause(shuffle: boolean) {
    this.context.playPlaylist(this.props.playlistType, shuffle);
    this.setState({ isPlaying: true });
  }

  public render() {
    const isShuffleMode = this.context.instance.player.shuffleMode;

    return (
      <ButtonDiv>
        <PlayPauseButton onClick={() => this.togglePlayPause(false)}>
          <PlayButtonContent />
        </PlayPauseButton>
        <ShuffleButton
          isOn={isShuffleMode}
          onClick={() => this.togglePlayPause(true)}
        >
          <ShuffleButtonContent />
        </ShuffleButton>
      </ButtonDiv>
    );
  }
}
