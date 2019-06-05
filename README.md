# Kids Tunes With Apple MusicKit - React App

`kids-tunes` is a sample Apple MusicKit project that demonstrates how to integrate Apple MusicKit with your iOS, Android or web app. A fully-functional sample app is available for each platform, and includes a platform-specific README with a simple walkthrough of the main features. Please be aware that the current version of this project is Beta 1 and will continue to be updated.

This README will provide a brief overview and install steps. You can also check out the web app on the [Kids Tunes](https://kidstunes.fm) site.

Note: as of 6/3/2019 we’ve experienced periodic latency issues and sporadic errors. You may experience similar issues when working with the MusicKit API.

## Requirements

- React
- npm or Yarn

## Installation

1. Clone or download this project repo to your local system
2. From the project root directory, run `npm install`
3. Create a `.env` file in the root directory of the project, and populate it with the following 3 lines:

```bash
REACT_APP_DEVELOPER_TOKEN=<your Apple Developer Token>
REACT_APP_NAME=com.music-kit.test
REACT_APP_BUILD=2019.4.21
```

4. run `npm start` or `yarn start` to launch the app

## Apple Music Pre-Requisites

In order for the sample app to work correctly with the Apple Music APIs, you will need to generate your own **Apple Music ID** and **Apple Music Keys**. These will be tied to an existing Apple Developer account and an active Apple Music Subscription. Only one Apple Music ID is needed, and can be used across all 3 platforms. A unique Apple Music Key will be needed for each environment (Dev, Prod), but can be used across all 3 platforms. Your app will fail to run without these generated and entered into your sample app.

### Generate Apple Music ID

1. Go to your [Apple Developer Portal](https://developer.apple.com/account)
2. Navigate to Certificates, Identifiers & Profiles
3. Select Identifiers on the left
4. Hit the + to Add a new Identifier
5. Select Music IDs from the list and hit Continue
6. Follow instructions to generate your Music ID

### Generate Apple MusicKit Developer Token

1. Go to your [Apple Developer Portal](https://developer.apple.com/account)
2. Navigate to Keys
3. Hit the + to Add a new Key for each Environment you need
4. Follow instructions to generate your MusicKit Key, selecting the Music ID you generated in the previous section
5. This will be used as your Developer Token in the app

## About this app

This repository provides a starter project, called Kids Tunes, that will allow a user to listen to children's music from their personal Apple Music account. The main features allow you to:

- Sign-in with your Apple Music Subscription Account
- Pull the top songs from the children's music genre in the Apple Music catalog
- Play/Pause/Rewind/Fast Forward songs
- Mark songs as Favorites and add them to a Favorites playlist

## Platform specific documentation

Detailed documentation is available in each platform's repository.

- [iOS Project](https://github.com/assembleinc/kids-tunes-ios)
- [Android Project](https://github.com/assembleinc/kids-tunes-android)
- [Web Project](https://github.com/assembleinc/kids-tunes-react)

### About the creators

This app was created by [Assemble Inc.](https://assembleinc.com) as a demonstration project for WWDC 2019.

## Want to contribute?

Feel free to submit a PR for review.

---

# Web App Key Functionality Walkthrough

## Application Features

The `kids-tunes` project has 4 main features that interact with Apple Music: Authentication, Pulling Catalog Items, Music Playback, and Playlist Management.

## Authentication

Authentication is done using the MusicKit JS library

MusicKit JS handles the token and is a proxy/wrapper for the calls.

Configure MusicKit JS

```js
const musicKit = window.MusicKit;
musicKit.configure({
  developerToken: developerToken,
  app: {
    name: appName,
    build: appBuild
  }
});
```

Make calls to MusicKit JS to authenticate

```js
const instance = window.MusicKit.getInstance();
await instance.authorize();
```

## Pulling Catalog Items

The Kids Tunes app is specifically set to only pull music from the Apple Music Catalog that is tagged with the 'children's music' genre. For the sake of this sample app, the genre is hard-coded to 'kids'.

Every time you call window.MusicKit.getInstance(), it spins up a new instance. Consider reusing the same instance to prevent additional memory needs.

```js
export enum Genres {
  Childrens_Music = 4
}

const instance = window.MusicKit.getInstance();
const instance = this.context.instance;
const response = await instance.api.charts(["songs"], { genre: Genres.Children_Music });
const chart = response.songs;
```

Each catalog item also contains multiple color pallettes, which can be used for custom styling.

```js
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
```

## Music Playback

The playback calls are asynchronous and require using promises or async/await:

```js
const instance = window.MusicKit.getInstance();
await instance.setQueue({
  items: items
});
await instance.play();
```

If playing from a playlist:

```js
const player = instance.player;
const mediaItemIndex = player.items.indexOf(mediaItem);
await instance.setQueue({
  items: this.favorites,
  startPosition: mediaItemIndex
});
await instance.play();
```

## Playlist Management

To create a new playlist:

```js
import axios from "axios";
const instance = window.MusicKit.getInstance();
const apiClient = axios.create({
  baseURL: "https://api.music.apple.com/v1",
  headers: {
    Authorization: `Bearer ${instance.developerToken}`,
    "Music-User-Token": instance.musicUserToken
  }
});

const response = await apiClient.post("/me/library/playlists", {
  attributes: {
    name: "Kids Tunes"
  }
});
```

To add a song to the favorites playlist (note: the API does not currently support the removal of a song from the favorites playlist):

```js
async addToFavorites() {
  const nowPlayingItem = this.state.instance.player.nowPlayingItem;
  const isFavorite = this.context.isMediaItemFavorite(nowPlayingItem);
  if (!isFavorite) {
    const player = this.state.instance.player;
    const nowPlayingItem = player.nowPlayingItem as MediaItem;
    await this.context.addFavorite(nowPlayingItem);
  }
}
```

To search for a playlist:

```js
const instance = window.MusicKit.getInstance();
const response = await instance.api.library.search("Kids Tunes", {
  types: ["library-playlists"]
});
```

To see more, visit [Apple MusicKit.js Documentation](https://developer.apple.com/documentation/musickitjs).
