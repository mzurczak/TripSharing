import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css'

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';


class TripInfo extends Component {

  render(){
    if ( this.props.trip !== undefined ) {
      return(
        <div className = "TripInfo-container">
          <FlatButton
          style = {{backgroundColor: "Aquamarine", color: "black"}}
          label="Join trip"
          labelPosition="after"
          primary={true}
          icon={
            <FontIcon className="material-icons" hoverColor = "white" style = {{cursor: "pointer"}}>add_circle</FontIcon>
          }
          />
          <div className = "TripInfo-description">
            <h2>Description: </h2>
            <p> { 
              this.props.trip.description  
            }
            </p>
          </div>
          <div className = "TripInfo-glance">
            <h2>Trip at glance: </h2> 
            <ul>
              <li> Places: </li> 
              <li> {`Transportation: ${ this.props.trip.transportation }`} </li> 
              <li> Budget forecast: </li> 
            </ul> 
          </div>
          <div className = "TripInfo-participants">
            <h2>Participants: </h2>  
          </div>
        </div>
      )
    } else {
      return "Page loading..."
    }
  }
}

// const mapStateToProps = ( {tripsReducer} ) => {
//   return ({
//     trip: tripsReducer.trips
//   })
// }

export default connect()(TripInfo);