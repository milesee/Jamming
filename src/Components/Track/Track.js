import React, { Component } from 'react';
import './track.css';

class Track extends Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  renderAction(){
    let trackAction = this.props.isRemoval ? '-' : '+';
    if(trackAction === '+'){
      return(
        <a className='Track-action' onClick={this.addTrack}>{trackAction}</a>
      );
    } else {
      return(
        <a className='Track-action' onClick={this.removeTrack}>{trackAction}</a>
      );
    }
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
