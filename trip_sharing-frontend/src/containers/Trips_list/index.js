import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css'

import {GridList} from 'material-ui/GridList';

import TripItem from '../../components/Trips_item'
import { fetchAllTrips } from '../../utils/fetch_functions';

class TripList extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAllTrips());
  }
  render() {
    return(
      <div className = "TripList">
        <h2>The newest</h2><br/>
        <GridList
          className = "TripList-gridList"
          cellHeight = { 280 }
          cols = { 3 }
          padding = { 15 }
        >
          { (this.props.trips.length !== 0)
            ? Object.values(this.props.trips).map((trip, index) => (
            <TripItem trip = { trip } key = { index }/>
          ))
          : "Loadign list of trips..."
        }
        </GridList>
      </div>
    )
  }
}

const mapStateToProps = ( { tripsReducer } ) => {
  return ({
    trips: tripsReducer.trips
  })
}

export default connect(mapStateToProps)(TripList);