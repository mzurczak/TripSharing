import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';
import Header from '../../containers/Header';
import CoverPhoto from '../../components/Trip_CoverPhoto';
import TripInfo from '../../containers/TripInfo'

import { fetchSpecificTrip } from '../../utils/fetch_functions'

class TripPage extends Component {

  componentWillMount(){
    this.props.dispatch(fetchSpecificTrip(this.props.match.params.tripId))
  }
  
  render(){
    console.log(this.props.trip);
    return(
      <div>
        <Header />
        <CoverPhoto 
          photoUrl = { this.props.trip.photo } 
          name = { this.props.trip.name }
          host = { (this.props.trip.host !== undefined) 
            ? this.props.trip.host.username
            : "" }
          />
        <div className = "TripPage-body">
          <TripInfo />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( {tripsReducer} ) => {
  return ({
    trip: tripsReducer.trips
  })
}

export default connect(mapStateToProps)(TripPage);