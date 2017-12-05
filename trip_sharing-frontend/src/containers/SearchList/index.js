import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './index.css';

import TripItem from '../../components/Trips_item'

class SearchList extends Component {
  
  render(){
    return(
      Object.values(this.props.passing).map(trip => {
        return (
          <div className = "SearchList-body">
            <div className = "SearchList-item">
              <TripItem trip = { trip } />
            </div>
            <div className = "SearchList-description">
              <h2>Description: </h2>
              <p> { trip.description } </p>
            </div>
          </div>
        )
      })
    )
  }
}

export default connect()(withRouter(SearchList));