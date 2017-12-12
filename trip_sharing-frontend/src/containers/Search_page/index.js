import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css'

import Header from '../../components/Header'
import SearchList from '../../components/SearchList'
import { fetchSearching } from '../../utils/tripFetch_functions';


class SearchPage extends Component {
  
  // componentWillMount(){
  //   this.props.dispatch(fetchSearching(this.props.match.params.searchTrip))
  // }


  render(){
    return(
    <div>
      <Header />
      <div className = "SearchPage">
        <h1> Search results: </h1>
      </div>
      <SearchList passing = {this.props.trips}/>
    </div>

    )
  }
}

const mapStateToProps = ( { tripsReducer }) => {
  return ({
    trips: tripsReducer.trips
  })
}
export default connect(mapStateToProps)(SearchPage)