# Spotify Playlist Duplicate Remover

Script that helps you find duplicate songs in a Spotify playlist.

## How to use

- Get access token from [here](https://developer.spotify.com/dashboard)
- You'll get client ID and client secret.

```bash
git clone https://github.com/Ryomensukuna2003/dedupe-my-playlist.git
cd dedupe-my-playlist
npm i && cp sample.env .env 
# Enter client ID and client secret in the .env file
node index.js
# It will prompt you to enter the playlist ID
```

