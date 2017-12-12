import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';
import Header from '../../components/Header';
import CoverPhoto from '../../components/CoverPhoto';
import TripInfo from '../../containers/TripInfo'

import { fetchSpecificTrip } from '../../utils/tripFetch_functions'

class TripPage extends Component {

  componentDidMount(){
    this.props.dispatch(fetchSpecificTrip(this.props.match.params.tripId))
  }
  
  render(){
    const { trip } = this.props;
    if(trip !== undefined){
      return(
        <div>
          <Header />
          <CoverPhoto 
            coverPhotoData = { trip }
            typeOfPhoto = { 'tripCoverPhoto' }
          />
          <div className = "TripPage-body">
            <TripInfo trip = { trip }/>
          </div>
        </div>
      )
    } else {
      return "Loading..."
    }
  }
}

const mapStateToProps = ( {tripsReducer}, props ) => {
  const tripId = props.match.params.tripId;
  const trip = Object.values(tripsReducer.trips).filter( trip => trip.id === tripId )[0]
  return ({
    trip 
  })
}

export default connect(mapStateToProps)(TripPage);