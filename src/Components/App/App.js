import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      searchResults: [],
      playlistName: ' My Playlist',
      playlistTracks: [],
    };
    Spotify.getAccessToken();
  }

  addTrack(track){
    let foundTrack  = this.state.playlistTracks.find(
      function(playListTrack){
        return(playListTrack.id === track.id);
      }
    );
    if(foundTrack === undefined){
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks: this.state.playlistTracks});
    }
  }

  removeTrack(track){
    let filteredPlaylist = this.state.playlistTracks.filter(
      playlistTrack => playlistTrack.id !== track.id
    );
    this.setState({playlistTracks: filteredPlaylist});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    let thisApp = this;
    let trackURIs = this.state.playlistTracks.map(track => 'spotify:track:' + track.id);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(function(response){
      thisApp.setState({playlistName: 'New Playlist'});
      thisApp.setState({playlistTracks: []});
    })
  }

  search(searchTerm){
    let thisApp = this;
    //Spotify.getAccessToken();
    Spotify.search(searchTerm).then(function(searchresults){
      thisApp.setState({searchResults: searchresults});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlist={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
