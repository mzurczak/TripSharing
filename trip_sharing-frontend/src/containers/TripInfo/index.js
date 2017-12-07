import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import './index.css'

import EditButton from '../../components/EditButton'
import JoinButton from '../../components/JoinButton'

class TripInfo extends Component {

  renderButtons = () => {
    if (localStorage.getItem('token')){
      if( this.props.trip.host.username !== this.props.user.username) {
        return <JoinButton trip = { this.props.trip} user = { this.props.user}/>
      } else {
        return <EditButton tripId = { this.props.trip.id} />
      }
    } 
  }

  render(){
    const { trip } = this.props;
    if ( this.props.trip !== undefined ) {
      return(
        <div className = "TripInfo-container">
          { this.renderButtons()}
          <div className = "TripInfo-description">
            <h2>Description: </h2>
            <p> { 
              trip.description  
            }
            </p>
          </div>
          <div className = "TripInfo-glance">
            <h2>Trip at glance: </h2> 
            <ul>
              <li> Date: {`${ trip.startDate} - ${ trip.endDate}`}</li> 
              <li> Places: </li> 
                <ul>
                  {
                    (trip.places.length > 0 )
                    ? trip.places.map( (place, index) => {
                      if(place !==null){
                        return (<li key = { index }> { place } </li>)
                      }
                      return ""
                    } )
                    : ""
                  }
                </ul>
              <li> Transportation: {`${ 
                (trip.transportation!==undefined)
                ? trip.transportation
                : "-"  }`} </li> 
              <li> Budget forecast: { ` ${ 
                (trip.budget!==undefined)
                ? trip.budget
                : "-"  }` }</li> 
            </ul> 
          </div>
          <div className = "TripInfo-participants">
            <h2>Participants: </h2> 
            <ul>
              {
                (trip.participants.length > 0 && trip.participants[0] !== null)
                ? trip.participants.map( (user, index) => 
                 { return (<li key = { index }> { user.username } </li>)}
                )
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

export default connect(mapStateToProps)(withRouter(TripInfo));