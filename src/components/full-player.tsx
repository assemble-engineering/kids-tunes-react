import React, { SFC } from "react";
import styled from "@emotion/styled";
import { MediaItem, MusicKitInstance } from "../types";
import { MusicKitContext } from "../model/MusicKitController";
import { ReactComponent as FavoriteIcon } from "../assets/favorite.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import { ReactComponent as PauseIcon } from "../assets/pause.svg";
import { ReactComponent as PlayIcon } from "../assets/play.svg";
import { ReactComponent as FastForwardIcon } from "../assets/fast-forward.svg";
import { ReactComponent as RewindIcon } from "../assets/rewind.svg";
import { ProgressBar } from ".";

interface BlurredProps {
  backgroundColor: string;
}

interface TextColor {
  color: string;
}

const Background: SFC<BlurredProps> = styled.div`
  background-color: ${props => props.backgroundColor};
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 100;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  overflow: scroll;
`;

const Player = styled.div`
  width: 310px;
  margin: 0px auto;
`;

const Artwork = styled.img`
  margin-bottom: 35px;
  border-radius: 7px;
  width: 305px;
  width: 305px;
`;

const TimeDiv = styled.div`
  margin-top: 5px;
  display: grid;
  grid-template-columns: 282px 1fr;
`;

const TimePlayed: SFC<TextColor> = styled.p`
  display: inline-block;
  width: 30px;
  height: 18px;
  font-family: Helvetica, sans-serif;
  font-size: 13px;
  line-height: 1.38;
  letter-spacing: -0.1px;
  color: ${props => props.color};
`;

const TimeRemaining: SFC<TextColor> = styled.p`
  display: inline;
  font-family: Helvetica, sans-serif;
  font-size: 13px;
  line-height: 1.38;
  letter-spacing: -0.1px;
  color: ${props => props.color};
`;

const SongTitle: SFC<TextColor> = styled.h2`
  width: 310px;
  height: 40px;
  font-family: Helvetica, sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.46;
  letter-spacing: 0.3px;
  text-align: center;
  color: ${props => props.color};
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
`;

const ScrollSongTitle: SFC<TextColor> = styled.h2`
  height: 40px;
  font-family: Helvetica, sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.46;
  letter-spacing: 0.3px;
  text-align: center;
  color: ${props => props.color};
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  animation: marquee 15s linear infinite;

  @keyframes marquee {
    0% {
      text-indent: 310px;
    }
    100% {
      text-indent: -30em;
    }
  }

  &:hover {
    animation-play-state: pause;
  }
`;

const Artist: SFC<TextColor> = styled.h3`
  width: 310px;
  height: 20px;
  font-family: Helvetica, sans-serif;
  font-size: 17px;
  line-height: 1.29;
  letter-spacing: -0.4px;
  text-align: center;
  color: ${props => props.color};
  /* margin-bottom: 35px; */
`;

const MusicControls = styled.div`
  height: 50px;
  margin: 0px auto 20px auto;
  width: 310px;
  display: grid;
  grid-template-columns: 115px 1fr 115px;
`;

const RewindButton = styled(RewindIcon)`
  justify-self: start;
  margin: auto 0px auto 30px;
  cursor: pointer;
  width: 32px;
  height: 21px;
`;

const FastForwardButton = styled(FastForwardIcon)`
  width: 32px;
  height: 21px;
  justify-self: end;
  margin: auto 30px auto 0px;
  cursor: pointer;
`;

const PauseButton = styled(PauseIcon)`
  justify-self: center;
  cursor: pointer;
  width: 38px;
  height: 51px;
`;

const PlayButton = styled(PlayIcon)`
  justify-self: center;
  cursor: pointer;
  width: 38px;
  height: 51px;
`;

const CloseButton = styled(CloseIcon)`
  margin: 0px 0px 20px 0px;
  cursor: pointer;
  width: 22px;
  height: 21px;
  fill: ${props => props.fill};
`;

const FavoriteButton = styled(FavoriteIcon)`
  cursor: pointer;
  display: block;
  margin: 0px auto;
  width: 42px;
  cursor: pointer;
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
`;

interface Props {
  onClose: () => void;
}

interface State {
  instance: MusicKitInstance;
  isPlaying: boolean;
}

export default class FullPlayer extends React.Component<Props, State> {
  static contextType = MusicKitContext;

  constructor(props: Props) {
    super(props);
    this.previousSong = this.previousSong.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.onProgressChange = this.onProgressChange.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
  }

  componentWillMount() {
    const instance = this.context.instance;
    this.setState({ instance, isPlaying: instance.player.isPlaying });

    instance.addEventListener(
      window.MusicKit.Events.playbackTimeDidChange,
      () => {
        this.forceUpdate();
      }
    );
  }

  async previousSong() {
    const instance = this.state.instance;
    await instance.skipToPreviousItem();
  }

  async togglePlayPause() {
    const instance = this.state.instance;
    const player = instance.player;
    if (player.isPlaying) {
      instance.pause();
      this.setState({ instance, isPlaying: false });
    } else {
      await instance.play();
      this.setState({ instance, isPlaying: true });
    }
  }

  async nextSong() {
    const instance = this.state.instance;
    await instance.skipToNextItem();
  }

  async onProgressChange(progress: number) {
    const instance = this.state.instance;
    const duration = instance.player.currentPlaybackDuration;
    await instance.seekToTime(progress * duration);
  }

  async addToFavorites() {
    const nowPlayingItem = this.state.instance.player.nowPlayingItem;
    const isFavorite = this.context.isMediaItemFavorite(nowPlayingItem);
    if (!isFavorite) {
      // Currently there is no API to remove a song from a playlist
      const player = this.state.instance.player;
      const nowPlayingItem = player.nowPlayingItem as MediaItem;
      await this.context.addFavorite(nowPlayingItem);
    }
  }

  render() {
    const player = this.state.instance.player;
    const nowPlayingItem = player.nowPlayingItem as MediaItem;
    if (!nowPlayingItem) return;

    const artworkURL = this.context.musicKit.formatArtworkURL(
      nowPlayingItem.attributes.artwork,
      "305",
      "305"
    );

    const timePlayed = this.context.musicKit.formatMediaTime(
      player.currentPlaybackTime
    );
    const timeRemaining = this.context.musicKit.formatMediaTime(
      player.currentPlaybackTimeRemaining
    );

    const {
      titleColor,
      tintColor,
      backgroundColor
    } = this.context.artworkColorsForMediaItem(nowPlayingItem);

    let title = (
      <SongTitle color={`${titleColor}`}>
        {nowPlayingItem.attributes.name}
      </SongTitle>
    );

    if (nowPlayingItem.attributes.name.length > 23) {
      title = (
        <ScrollSongTitle color={`${titleColor}`}>
          {nowPlayingItem.attributes.name}
        </ScrollSongTitle>
      );
    }

    const playPauseButton = this.state.isPlaying ? (
      <PauseButton fill={tintColor} onClick={this.togglePlayPause} />
    ) : (
      <PlayButton fill={tintColor} onClick={this.togglePlayPause} />
    );

    const isFavorite = this.context.isMediaItemFavorite(nowPlayingItem);
    const favoriteColor = isFavorite ? "#ff2d54" : tintColor;
    return (
      <>
        <Background backgroundColor={`${backgroundColor}cf`} />
        <Container>
          <Player>
            <CloseButton fill={tintColor} onClick={this.props.onClose} />
            <Artwork src={artworkURL} alt="Album artwork" />
            <ProgressBar
              tintColor={tintColor}
              progressPercentage={player.currentPlaybackProgress}
              onProgressChange={this.onProgressChange}
            />
            <TimeDiv>
              <TimePlayed color={tintColor}>{timePlayed}</TimePlayed>
              <TimeRemaining color={tintColor}>{timeRemaining}</TimeRemaining>
            </TimeDiv>
            {title}
            <Artist color={tintColor}>
              {nowPlayingItem.attributes.artistName}
            </Artist>
            <MusicControls>
              <RewindButton fill={tintColor} onClick={this.previousSong} />
              {playPauseButton}
              <FastForwardButton onClick={this.nextSong} fill={tintColor} />
            </MusicControls>
            <FavoriteButton
              onClick={this.addToFavorites}
              stroke={favoriteColor}
              fill={isFavorite ? favoriteColor : "none"}
            />
          </Player>
        </Container>
      </>
    );
  }
}
