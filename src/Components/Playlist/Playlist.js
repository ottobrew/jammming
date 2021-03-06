import React from 'react';

import './Playlist.css';
import TrackList from '../TrackList/TrackList';


class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }

  render() {
    return (
      /* #61. "In the Playlist render method, pass .handleNameChange() to an onChange property." */

      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
          <TrackList tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove} isRemoval={true}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}



export default Playlist;
