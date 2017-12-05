import React, { Component } from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { withRouter } from 'react-router-dom';

import { fetchSearching, fetchAllTrips } from '../../utils/fetch_functions';

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

  componentDidMount(){
    this.props.dispatch(fetchAllTrips())
  }
  constructor(){
    super();

    this.state = {
      searchItem: ''
    }
  }

  handleChangeSearchItem = (e) => {
    this.setState({
      searchItem: e.toLowerCase()
    });
  }

  handleSearch = () => {
    const searchItem = this.state.searchItem;
    this.props.dispatch(fetchSearching(searchItem))
      .then(() => this.props.history.push(`/search/${ searchItem }`));
  }

  render(){
    return(
      <span className = "SearchBar">
        <form >
          <AutoComplete 
            hintText = "Search your next adventure..."
            style = { styles.searchBox } 
            underlineShow = {false}
            onUpdateInput = { this.handleChangeSearchItem }
            onNewRequest = { this.handleSearch }
            inputStyle = {
              { fontSize: '25px', 
                fontWeight: '200',
              }
            }
            dataSource = { this.props.tripNames }
            />
          <FlatButton 
            icon = {<FontIcon className="material-icons">search</FontIcon>}
            style = { styles.searchButton } 
            onClick = { this.handleSearch } />
        </form>
      </span>
    )
  }
}

const mapStateToProps = ( { tripsReducer }) => {
  var tripNames = []
  if (Object.keys(tripsReducer.trips).length > 0) {
    const trips = tripsReducer.trips;
    for (let trip in  trips) {
      let newName = trips[trip].name.toLowerCase();
      tripNames.push(newName)
    }
  } 
  return ({
    tripNames
  })
}
export default connect(mapStateToProps)(withRouter(SearchBar))