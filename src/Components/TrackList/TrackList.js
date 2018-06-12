import React, { Component } from 'react';
import './tracklist.css';
import Track from '../Track/Track';

class TrackList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="TrackList">
          {this.props.tracks.map(
            track => <Track track={track} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
          )}
      </div>
    );
  }
}

export default TrackList;
