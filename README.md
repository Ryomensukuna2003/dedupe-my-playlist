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
- It will group the tracks by the similarity of the tracks
- It will return the tracks that have the same similarity   


<img width="1710" height="1112" alt="Screenshot 2025-10-28 at 10 46 55 PM" src="https://github.com/user-attachments/assets/9dd91cdc-0378-4957-92f1-a3922d9bea3e" />
