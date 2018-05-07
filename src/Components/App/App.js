import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []

    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(searchTerm) {
    console.log(`Search for ${searchTerm}`);
    Spotify.getAccessToken();
    console.log(`Access Token is ${Spotify.getAccessToken()}`);
    Spotify.search(searchTerm).then(tracks => {
      this.setState({
        searchResults: tracks
        /* #88. Update the state of searchResults
        with the value resolved from Spotify.search()'s promise. */
      });
    });
  }

  addTrack(track) {
    /* #41.*/
    let newPlaylistTracks = this.state.playlistTracks;

    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      console.log('Track already in Playlist');
      return;
    } else {
      newPlaylistTracks.push(track);
      console.log(`${track.name} added!`);
      this.setState({playlistTracks: newPlaylistTracks});
    }
  }

  removeTrack(track) {
    /* #49.*/
    console.log('Remove Track');
    let newPlaylistTracks = this.state.playlistTracks;
    newPlaylistTracks = newPlaylistTracks.filter(savedTrack =>
      savedTrack.id !== track.id)
    this.setState({playlistTracks: newPlaylistTracks});
    }


  updatePlaylistName(newName) {
    this.setState ({playlistName: newName});
    console.log(this.state.playlistName)
  }

  resetPlaylist() {
    this.setState({
      playlistName: "New Playlist",
      playlistTracks: []
    })
  }

  savePlaylist() {
    /* #63.
    Generates an array of uri values called trackURIs from
    the playlistTracks property. */
    let trackURIs = [];
    this.state.playlistTracks.map(track =>
      track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}/>
        </div>
        </div>
      </div>
    );
  }
}



export default App;
