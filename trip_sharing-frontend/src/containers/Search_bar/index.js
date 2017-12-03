import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';

import { fetchSearching } from '../../utils/fetch_functions';

import './index.css'

const styles = { 
  searchButton: {
    opacity: 0.8,
    backgroundColor: '#F8F8FF',
    height: '55px',
    borderRadius: '15px',
  },

  searchBox: {
    opacity: 0.8,
    paddingLeft: '20px',
    backgroundColor: '#F8F8FF',
    borderRadius: '15px',
    marginRight: '20px',
    height: '55px',
    width: '500px'
  },
}

class SearchBar extends Component {

  constructor(){
    super();

    this.state = {
      searchItem: ''
    }
  }

  handleChangeSearchItem = (e) => {
    this.setState({
      searchItem: e.currentTarget.value
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const searchItem = this.state.searchItem;
    this.props.dispatch(fetchSearching(searchItem))
      .then(() => this.props.history.push(`/trips/search_results`));
  }

  render(){
    return(
      <span className = "SearchBar">
        <form 
          onSubmit = { this.handleSearch }>
          <TextField 
            id = "search-text-field"
            hintText = "Search your next adventure..."
            style = { styles.searchBox } 
            underlineShow = {false}
            onChange = { this.handleChangeSearchItem }
            inputStyle = {
              { fontSize: '25px', 
                fontWeight: '200',
              }
            }/>
          <FlatButton 
            icon = {<FontIcon className="material-icons">search</FontIcon>}
            style = { styles.searchButton } 
            onClick = { this.handleSearch } />
        </form>
      </span>
    )
  }
}

export default connect()(withRouter(SearchBar))