import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null
    }
    this.search=this.search.bind(this);
    this.handleTermChange=this.handleTermChange.bind(this);
  }

  /* #69. In SearchBar.js, create a method called search that
  passes the state of the term to this.props.onSearch */

    search() {
        this.props.onSearch(this.state.searchTerm);
      }

    handleTermChange(event) {
      this.setState({
        searchTerm: event.target.value
      });
    }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
}



export default SearchBar;
