var accessToken;
var expiresIn;
const clientId = 'c0a4d2f06b6e495a9b41ec116fb43bfe';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken(){
    if(accessToken !== undefined && accessToken !== null){
      return accessToken;
    }

    // check the url for the token
    let url = window.location.href;
    let matchToken = url.match(/access_token=([^&]*)/);
    let matchExpires = url.match(/expires_in=([^&]*)/);
    if(matchToken !== null && matchExpires !== null){
      accessToken = matchToken[1];
      expiresIn = matchExpires[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      let url = 'https://accounts.spotify.com/authorize?client_id=' + clientId +
      '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectUri;
      window.location.href = url;
    }
  },

  search(searchTerm){
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {headers: {Authorization: `Bearer ${accessToken}`}})
    .then(response => response.json())
    .then(function(jsonResponse){
      // map json to an array of tracks and return it
      if(!jsonResponse){
        return [];
      }
      if(jsonResponse.tracks.items.length === 0){
        return [];
      }
      let tracks = jsonResponse.tracks.items.map(function(item){
        return {
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          URI: item.uri
        }
      });
      return tracks;
    });
  },

  savePlaylist(name, trackUris){
    if(!(name && trackUris)){
      return;
    }

    let token = accessToken;
    let headers = {Authorization: `Bearer ${accessToken}`};
    let userId = 'xxx';

    // get userid
    return  fetch('https://api.spotify.com/v1/me', {headers: headers})
    .then(response => response.json())
    .then(function(jsonResponse){
      userId = jsonResponse.id;
      //headers.ContentType = 'application/json';
      let body = {name: name};
      let postProps = {headers:headers, method:'POST', body:JSON.stringify(body)};
      // create new playlist
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, postProps)
      .then(function(response){
        return response.json();})
      .then(function(jsonResponse){
        let playlistId = jsonResponse.id;
        // add tracks to new playlist
        let body = {uris: trackUris};
        let postProps = {headers:headers, method:'POST', body:JSON.stringify(body)};
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, postProps);
      });
    });
  }
};

export default Spotify;
