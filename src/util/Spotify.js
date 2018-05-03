

const clientId = "dfa671e45800450488e8ccd89e49ccae";
const redirectUri = "http://localhost:3000/";

let accessToken;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
      /* Check steps for following condition */
    }

    const matchToken = window.location.href.match(/access_token=([^&]*)/)
    const matchExpiresIn = window.location.href.match(/expires_in=([^&]*)/)

    if (matchToken && matchExpiresIn) {
      accessToken = matchToken[1];
      const expiresIn = matchExpiresIn[1];

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
      } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    }
  },

  search(searchTerm) {
    const accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {Authorization: `Bearer ${accessToken}`} }).then(response => {
        if (response.ok) {
        return response.json();
      } else {
        throw new Error ('Request failed!');
      }}, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse => {

        if (jsonResponse.hasOwnProperty('tracks')) {
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        }
      });
    },

/*The .savePlaylist() method accepts a playlist name and an array of track URIs.
It makes the following three requests to the Spotify API:
GET current user's ID
POST a new playlist with the input name to the current user's Spotify account.
Receive the playlist ID back from the request.
POST the track URIs to the newly-created playlist,
referencing the current user's account (ID) and the new playlist (ID) */

  savePlaylist(playlistName, trackURIs) {
    /*#90.*/
    if (!playlistName || !trackURIs.length) {
      console.log('No tracks to save.')
      return;
    }

    const accessToken = this.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId;

    return fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then(response => {
      if (response.ok) {
      return response.json();
    } else {
      throw new Error ('Request failed!');
    }}, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(playlistName)
      }).then(response => (response.json()
    ).then(jsonResponse => {
      let playlistID = jsonResponse.id;
      //console.log(`Playlist ID ${playlistID}`)
      //console.log(`Tracks URI ${trackURIs}`)
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(trackURIs)
      }).then(response => (response.json()
    ).then(jsonResponse => {
      let playlistID = jsonResponse.id;
    }));
    }))
    });
  }
};




export default Spotify;
