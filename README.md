# Spotify Playlist Duplicate Remover

Script that helps you find duplicate songs in a Spotify playlist.

## How to use

- Get client ID and client secret from [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

```bash
git clone https://github.com/Ryomensukuna2003/dedupe-my-playlist.git
cd dedupe-my-playlist
npm i && cp sample.env .env 
# Enter client ID and client secret in the .env file
```
```bash
node index.js
# It will prompt you to enter the playlist ID
```

How dose this work?
- It will fetch all the tracks from the playlist
- It will create a JSON file that has mapping of words to tracks
- It will sort the tracks by the number of times the word appears in the track
- It will return the tracks that have the same word in the track


