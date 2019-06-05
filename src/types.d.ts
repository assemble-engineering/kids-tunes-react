declare global {
  interface Window {
    MusicKit: any;
  }
}

export interface MusicKitConfiguration {
  developerToken: string;
  appName: string;
  appBuild: string;
}

export interface Artwork {
  width: number;
  height: number;
  url: string;
  bgColor: string;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
}

export interface PlayParams {
  id: string;
  kind: string;
  catalogId: string;
  isLibrary: boolean;
  kind: string;
  reporting: boolean;
}

export interface SongAttributes {
  albumName: string;
  artistName: string;
  artwork: Artwork;
  discNumber: number;
  durationInMillis: number;
  isrc: string;
  name: string;
  releaseDate: string;
  trackNumber: number;
  url: string;
  genreNames: string[];
  playParams: PlayParams;
  previews: [
    {
      url: string;
    }
  ];
}

export interface MediaItem {
  id: string;
  type: MediaItemType;
  href: string;
  isExplicitItem: boolean;
  relationships?: {
    tracks: {
      data: any;
    };
  };
  attributes: SongAttributes;
}

export interface Chart {
  name: string;
  chart: string;
  href: string;
  next: string;
  data: MediaItem[];
}

export interface Playback {
  currentSong?: MediaItem;
  currentTime?: PlaybackTime;
}

export interface PlaybackTime {
  currentPlaybackDuration: number;
  currentPlaybackTime: number;
  currentPlaybackTimeRemaining: number;
}

export interface PlaybackTime {
  currentPlaybackDuration: number;
  currentPlaybackTime: number;
  currentPlaybackTimeRemaining: number;
}

export interface MusicKitInstance {
  musicUserToken: string;
  developerToken: string;
  player: Player;
  setQueue: any;
  play: () => Promise;
  pause: any;
  skipToNextItem: () => Promise;
  skipToPreviousItem: () => Promise;
  seekToTime: (time: number) => Promise;
  isAuthorized: boolean;
  authorize: () => Promise;
  unauthorize: () => Promise;
  api: any;
  stop: any;
  addToLibrary: any;
  changeToMediaAtIndex: any;
}

export interface MusicKit {
  getInstance: () => MusicKitInstance;
}

export enum PlaybackStates {
  high = "completed",
  ended = "ended",
  loading = "loading",
  none = "none",
  paused = "paused",
  playing = "playing",
  seeking = "seeking",
  stalled = "stalled",
  stopped = "stopped",
  waiting = "waiting"
}

export interface Queue {}

export enum RepeatMode {}

export enum PlayerShuffleMode {}

export enum PlaybackBitrate {
  high = "HIGH",
  standard = "STANDARD"
}

export interface Player {
  bitrate: PlaybackBitrate;
  canSupportDRM: boolean;
  currentPlaybackDuration: number;
  currentPlaybackProgress: number;
  currentPlaybackTime: number;
  currentPlaybackTimeRemaining: number;
  formattedCurrentPlaybackDuration: number;
  isPlaying: boolean;
  nowPlayingItem: MediaItem;
  nowPlayingItemIndex: number;
  playbackRate: number;
  playbackState: PlaybackStates;
  playbackTargetAvailable: boolean;
  queue: Queue;
  repeatMode: RepeatMode;
  shuffleMode: PlayerShuffleMode;
  volume: number;
  items: MediaItem[];
  shuffle: boolean;
}
