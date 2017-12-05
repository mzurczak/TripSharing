import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';
import Header from '../../containers/Header';
import CoverPhoto from '../../components/Trip_CoverPhoto';
import TripInfo from '../../containers/TripInfo'

import { fetchSpecificTrip } from '../../utils/fetch_functions'

class TripPage extends Component {

  componentDidMount(){
    this.props.dispatch(fetchSpecificTrip(this.props.match.params.tripId))
  }
  
  render(){
    const { trip } = this.props;
    if(trip.length > 0){
      console.log('Trip page', trip)
      return(
        <div>
          <Header />
          <CoverPhoto 
            photoUrl = {trip[0].photo } 
            name = { trip[0].name }
            host = { trip[0].host.username }
          />
          <div className = "TripPage-body">
            <TripInfo trip = { trip[0] }/>
          </div>
        </div>
      )
    } else {
      return "Loading..."
    }
  }
}

const mapStateToProps = ( {tripsReducer} ) => {
  return ({
    trip: Object.values(tripsReducer.trips)
  })
}

export default connect(mapStateToProps)(TripPage);