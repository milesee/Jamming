import React, { Component } from 'react';
import './playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(evt){
    this.props.onNameChange(evt.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlist} onRemove={this.props.onRemove} isRemoval={true}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
