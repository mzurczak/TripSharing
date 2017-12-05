import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css'

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { fetchUser } from '../../utils/fetch_functions';


class TripInfo extends Component {

  handleJoinTrip = () => {
    this.props.dispatch(fetchUser())
    .then(() => {
      const user = { ...this.props.user}
      console.log(user)
    })
  }

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
          onClick = { this.handleJoinTrip }
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
                <ul>
                  {
                    this.props.trip.places.map( (place, index) => 
                    (<li key = { index }> { place } </li>))
                  }
                </ul>
              <li> {`Transportation: ${ 
                (this.props.trip.transportation!==undefined)
                ? this.props.trip.transportation
                : "-"  }`} </li> 
              <li> Budget forecast: </li> 
            </ul> 
          </div>
          <div className = "TripInfo-participants">
            <h2>Participants: </h2> 
            <ul>
              {
                (this.props.trip.participants.length > 0)
                ? this.props.trip.participants.map( (user, index) => 
                (<li key = { index }> { user.username } </li>))
                : "Be the first one and apply!"
              }
            </ul> 
          </div>
        </div>
      )
    } else {
      return "Page loading..."
    }
  }
}

const mapStateToProps = ( { userReducer } ) => {
  return ({
    user: userReducer.userInfo
  })
}

export default connect(mapStateToProps)(TripInfo);