import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css'

import Header from '../../containers/Header'
import SearchList from '../../containers/SearchList'
import { fetchAllTrips, fetchUser } from '../../utils/fetch_functions';


class UserTripsPage extends Component {
  
  componentWillMount(){
    this.props.dispatch(fetchUser());
    this.props.dispatch(fetchAllTrips());
  }


  render(){
    return(
    <div>
      <Header />
      <div className = "UserTripsPage">
        <h1> Trips hosted by you: </h1>
      </div>
      <SearchList passing = {this.props.userTrips}/>
    </div>
    )
  }
}

const mapStateToProps = ( { tripsReducer, userReducer }) => {
  var userTrips = {};
  if (userReducer.userInfo !== undefined){
    const username = userReducer.userInfo.username;
    const userTripsArray = Object.values(tripsReducer.trips)
    .filter(trip => trip.host.username === username);
    userTripsArray.forEach(trip => {
      userTrips[trip.id] = trip;
    })
  }
  return ({
    userTrips
  })
}
export default connect(mapStateToProps)(UserTripsPage)