import { configDotenv } from 'dotenv';
import readline from 'node:readline';
import { formatAllData } from './utils.js';

configDotenv();

// Token caching (in-memory)
let cachedToken = null;
let tokenExpiresAt = 0;


// To get playlist tracks we need to get the access token
async function getAppAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 5000) {
    return cachedToken;
  }

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing CLIENT_ID or CLIENT_SECRET environment variables.');
  }

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const resp = await fetch(tokenUrl, {
      method: 'POST',
      body: params.toString(),
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await resp.json();
    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in * 1000);

    return cachedToken;
  } catch (err) {
    if (err.response && err.response.data) {
      const e = new Error('Failed to obtain access token: ' + JSON.stringify(err.response.data));
      e.status = err.response.status;
      throw e;
    }
    throw err;
  }
}

// To get all tracks from the playlist as limit is 100
const formatTracks = async (totalSongs, tracksObj, token) => {
  const formatted = tracksObj.items.map(item => {
    const track = item.track;
    return track.name;
  });

  let nextUrl = tracksObj.next;

  while (formatted.length < totalSongs && nextUrl) {
    const res = await fetch(nextUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await res.json();
    data.items.forEach(item => {
      const track = item.track;
      formatted.push(track.name);
    });

    nextUrl = data.next;
  }

  return formatted;
}


const main = async () => {
  try {
    const token = await getAppAccessToken();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the playlist ID: ', async (playlistId) => {
      rl.close();
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}?limit=100`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        const allTracks = await formatTracks(data.tracks.total, data.tracks, token);
        let playlistData = {
          total: allTracks.length,
          tracks: allTracks
        }
        const formattedData = formatAllData(playlistData);
        console.log(JSON.stringify(formattedData, null, 2));
      } catch (error) {
        console.error('Error fetching playlist:', error.response ? error.response.data : error.message);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();