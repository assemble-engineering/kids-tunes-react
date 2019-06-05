import React from "react";
import styled from "@emotion/styled";
import { MediaItem, Artwork } from "../types";
import { ReactComponent as FavoriteIcon } from "../assets/favorite.svg";
import { ReactComponent as PauseIcon } from "../assets/pause.svg";
import { ReactComponent as PlayIcon } from "../assets/play.svg";

const AlbumArt = styled.img`
  margin: 15px 18px;
  width: 60px;
  height: 60px;
  border-radius: 5px;
`;

const AlbumArtOverlay = styled.div`
  width: 60px;
  height: 60px;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.7);
  margin: 15px 18px;
  margin-left: -78px;
  border-radius: 5px;
  display: flex;
`;

const PauseButton = styled(PauseIcon)`
  width: 14px;
  height: 19px;
  margin: auto;
  fill: white;
`;

const PlayButton = styled(PlayIcon)`
  width: 14px;
  height: 19px;
  margin: auto;
  fill: white;
`;

const Information = styled.div`
  align-self: center;
  flex: 2;
`;

const Title = styled.h2`
  font-family: Helvetica, sans-serif;
  font-size: 17px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: -0.4px;
  color: #2e4d74;
`;

const Artist = styled.h3`
  font-family: Helvetica, sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.7;
  letter-spacing: -0.3px;
  color: #2e4d74;
`;

const Container = styled.div`
  width: 527px;
  height: 90px;
  background-color: #ffffff;
  box-shadow: 0 0 20px 0 #dfdce7;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  cursor: pointer;

  @media (max-width: 692px) {
    width: 340px;
  }

  -webkit-transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  -ms-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;

  &:hover {
    box-shadow: 0 0 27px 4px #cecada;
    -webkit-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }
`;

interface SVGProps {
  fill: string;
  stroke: string;
}

const FavoriteButton: React.FunctionComponent<SVGProps> = styled.div`
  cursor: pointer;
  margin: auto 27px;
  width: 30px;
  height: 30px;
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
`;

interface Props {
  song: MediaItem;
  isPlaying: boolean;
  isFavorite: boolean;
  isNowPlayingItem: boolean;
  onMediaItemSelected: (mediaItem: MediaItem) => void;
  formatArtworkURL: (artwork: Artwork, width: string, height: string) => string;
}

const SongCell: React.StatelessComponent<Props> = props => {
  let overlay = <div />;
  let titleColor = "#2e4d74";
  if (props.isNowPlayingItem) {
    titleColor = "#ff2d54";
    overlay = (
      <AlbumArtOverlay>
        {props.isPlaying ? <PauseButton /> : <PlayButton />}
      </AlbumArtOverlay>
    );
  }

  const attributes = props.song.attributes;
  const artworkURL = props.formatArtworkURL(attributes.artwork, "60", "60");
  const favoriteColor = props.isFavorite ? "#ff2d54" : "none";
  return (
    <>
      <Container onClick={() => props.onMediaItemSelected(props.song)}>
        <AlbumArt src={artworkURL} />
        {overlay}
        <Information>
          <Title style={{ color: titleColor }}>{attributes.name}</Title>
          <Artist>{attributes.artistName}</Artist>
        </Information>
        <FavoriteButton stroke={favoriteColor} fill={favoriteColor}>
          <FavoriteIcon />
        </FavoriteButton>
      </Container>
    </>
  );
};

export default SongCell;
