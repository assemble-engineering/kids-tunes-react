import React from "react";
import { MusicKit, MusicKitInstance, MediaItem, Chart } from "../types";
import { MediaItemTypes } from "./MediaItem";
import axios, { AxiosInstance } from "axios";

const developerToken = process.env.REACT_APP_DEVELOPER_TOKEN;
const appName = process.env.REACT_APP_NAME;
const appBuild = process.env.REACT_APP_BUILD;

export enum PlaylistType {
  topSongs,
  favorites
}

export class MusicKitController {
  private _instance?: MusicKitInstance;
  private _apiClient?: AxiosInstance;
  public musicKit: MusicKit;
  public favoritesPlaylist?: MediaItem;
  public favorites: MediaItem[];
  public topSongsChart?: Chart;

  private favoritesPlaylistName = "Kids Tunes Tracks";

  constructor() {
    const musicKit = window.MusicKit;
    musicKit.configure({
      developerToken: developerToken,
      app: {
        name: appName,
        build: appBuild,
        icon: "https://kidstunes.fm/assets/app-logo.png"
      }
    });
    this.musicKit = musicKit;
    this.favorites = [];
    this.findOrCreateFavoritesPlaylist = this.findOrCreateFavoritesPlaylist.bind(
      this
    );
  }

  get instance(): MusicKitInstance {
    if (!this._instance) {
      this._instance = this.musicKit.getInstance();
    }
    return this._instance!;
  }

  get apiClient(): AxiosInstance {
    if (!this._apiClient) {
      this._apiClient = axios.create({
        baseURL: "https://api.music.apple.com/v1",
        headers: {
          Authorization: `Bearer ${this.instance.developerToken}`,
          "Music-User-Token": this.instance.musicUserToken
        }
      });
    }
    return this._apiClient!;
  }

  public artworkColorsForMediaItem(item: MediaItem) {
    const mediaItemId = this.mediaItemId(item);
    const fullMediaItem = this.allSongs.find((song: MediaItem) => {
      return this.mediaItemId(song) === mediaItemId;
    });

    let colors = undefined;
    if (fullMediaItem) {
      const artwork = fullMediaItem.attributes.artwork;
      colors = {
        backgroundColor: `#${artwork.bgColor}`,
        titleColor: `#${artwork.textColor1}`,
        tintColor: `#${artwork.textColor2}`
      };
    }

    return colors;
  }

  public async playPlaylist(playlistType: PlaylistType, shuffled: boolean) {
    let items =
      playlistType === PlaylistType.favorites ? this.favorites : this.topSongs;
    this.instance.player.shuffle = shuffled;
    await this.playItems(items);
  }

  private async playItems(items: MediaItem[], startPosition: number = 0) {
    await this.instance.setQueue({ items });
    await this.instance.changeToMediaAtIndex(startPosition);
    await this.instance.play();
  }

  private isSongPlayingItem(mediaItem: MediaItem) {
    const player = this.instance.player;
    return !!player.nowPlayingItem && player.nowPlayingItem.id === mediaItem.id;
  }

  public async mediaItemSelected(mediaItem: MediaItem): Promise<void> {
    const instance = this.instance;
    const player = this.instance.player;
    const isSongPlayingItem = this.isSongPlayingItem(mediaItem);
    if (player.isPlaying && isSongPlayingItem) {
      instance.pause();
    } else if (!player.isPlaying && isSongPlayingItem) {
      await instance.play();
    } else {
      this.updateQueueAndPlay(mediaItem);
    }
  }

  private async updateQueueAndPlay(mediaItem: MediaItem) {
    let items: MediaItem[] = [];
    if (mediaItem.type === MediaItemTypes.LibrarySongs) {
      items = this.favorites;
    } else {
      items = this.topSongs;
    }

    let index = items.findIndex((item: MediaItem) => {
      return this.mediaItemId(mediaItem) === this.mediaItemId(item);
    });
    await this.playItems(items, index);
  }

  private mediaItemId(mediaItem: MediaItem) {
    let mediaItemId = mediaItem.id;
    if (mediaItem.attributes.playParams.isLibrary) {
      mediaItemId = mediaItem.attributes.playParams.catalogId;
    }
    return mediaItemId;
  }

  public isMediaItemFavorite(item: MediaItem) {
    const itemId = this.mediaItemId(item);
    const found = this.favorites.find(favorite => {
      return favorite.attributes.playParams.catalogId === itemId;
    });
    return !!found;
  }

  public isMediaItemPlaying(item: MediaItem) {
    const player = this.instance.player;
    const nowPlayingItem = player.nowPlayingItem;
    const itemId = this.mediaItemId(item);
    return !!nowPlayingItem && nowPlayingItem.id === itemId;
  }

  public get topSongs(): MediaItem[] {
    let topSongs: MediaItem[] = [];
    const topSongsChart = this.topSongsChart;
    if (topSongsChart && topSongsChart.data) {
      topSongs = topSongsChart.data;
    }
    return topSongs;
  }

  private get allSongs(): MediaItem[] {
    return this.topSongs.concat(this.favorites);
  }

  public async updateTopSongs(): Promise<MediaItem[]> {
    let response = await this.instance.api.charts(["songs"], { genre: "4" });
    this.topSongsChart = response.songs[0] as Chart;
    return this.topSongsChart.data;
  }

  public async addFavorite(item: MediaItem): Promise<void> {
    // Programmer error: Cannot call this method if the favorites playlist is
    // not configured.
    if (!this.favoritesPlaylist) {
      this.favoritesPlaylist = await this.findOrCreateFavoritesPlaylist();
    }
    const favoritesPlaylistId = this.favoritesPlaylist!.id;

    this.favorites = [...this.favorites, item];
    try {
      await this.apiClient.post(
        `/me/library/playlists/${favoritesPlaylistId}/tracks`,
        {
          data: [
            {
              id: this.mediaItemId(item),
              type: "songs"
            }
          ]
        }
      );

      await this.updateFavorites();
    } catch (err) {
      console.error(err);
    }
  }

  public async updateFavorites(): Promise<MediaItem[]> {
    // Programmer error: Cannot call this method if user is not logged in.
    console.assert(this.instance.isAuthorized);
    if (!this.favoritesPlaylist) return []; // Playlist don't yet exist;

    try {
      const response = await this.apiClient.get(
        `/me/library/playlists/${this.favoritesPlaylist!.id}/tracks`
      );
      if (!response.data.data) {
        throw new Error("Invalid response from the MusicKit API");
      }

      this.favorites = response.data.data as MediaItem[];
      return this.favorites;
    } catch (err) {
      console.error(`Apple Music API returned: ${err}`);

      // Unfortunate workaround to handle the latency between the time when the
      // playlist was created and when becomes available.
      return [];
    }
  }

  public async configureApplication(): Promise<void> {
    this.favoritesPlaylist = await this.findOrCreateFavoritesPlaylist();
    await this.updateFavorites();
    await this.updateTopSongs();
  }

  private async findOrCreateFavoritesPlaylist(): Promise<
    MediaItem | undefined
  > {
    try {
      let mediaItem = await this.fetchFavoritesPlaylist(this.instance);
      if (!mediaItem) {
        mediaItem = await this.createFavoritesPlaylist(this.apiClient);
      }
      this.favoritesPlaylist = mediaItem;
      return this.favoritesPlaylist;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  private async fetchFavoritesPlaylist(
    instance: MusicKitInstance
  ): Promise<MediaItem | undefined> {
    const response = await instance.api.library.search(
      this.favoritesPlaylistName,
      {
        types: ["library-playlists"]
      }
    );

    let playlist = undefined;
    const foundPlaylists = response["library-playlists"];
    if (foundPlaylists && foundPlaylists.data) {
      playlist = foundPlaylists.data.find((playlist: MediaItem) => {
        return playlist.attributes.name === this.favoritesPlaylistName;
      });
    }
    return playlist;
  }

  private async createFavoritesPlaylist(
    apiClient: AxiosInstance
  ): Promise<MediaItem> {
    const response = await apiClient.post("/me/library/playlists", {
      attributes: {
        name: this.favoritesPlaylistName
      }
    });
    if (!response.data.data && response.data.data.length === 0) {
      throw new Error("Invalid response from the MusicKit API");
    }
    return response.data.data.shift() as MediaItem;
  }
}

export const MusicKitContext = React.createContext<MusicKitController | null>(
  null
);
