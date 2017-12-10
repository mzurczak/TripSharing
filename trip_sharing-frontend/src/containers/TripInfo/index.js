import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment';

import './index.css'

import EditButton from '../../components/EditButton'
import JoinButton from '../../components/JoinButton'
import MapContainer from '../MapContainer'

class TripInfo extends Component {

  renderButtons = () => {
    if (this.props.user !== undefined && this.props.trip !== undefined){
      if( this.props.trip.host.username !== this.props.user.username) {
        return <JoinButton trip = { this.props.trip} user = { this.props.user}/>
      } else {
        return <EditButton tripId = { this.props.trip.id} />
      }
    } 
  }

  dateFormatter = (dateToFormat) => {
    let dateFormatted = new Moment(dateToFormat).format('LL');
    return dateFormatted;
  }
  render(){
    const { trip } = this.props;
    
    if ( this.props.trip !== undefined ) {
      console.log(trip.participants) 
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
              <li> Date: {
                <ul>
                  <li> Start: { 
                    (trip.startDate === null) 
                    ? "Not defined yet" 
                    : this.dateFormatter(trip.startDate) }
                  </li>
                  <li> End: {
                    (trip.endDate === null) 
                    ? "Not defined yet" 
                    : this.dateFormatter(trip.endDate) }
                  </li> 
                </ul>
              }
              </li>
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
                (trip.transportation!==undefined && trip.transportation!==null)
                ? trip.transportation
                : "-"  }`} </li> 
              <li> Budget forecast: { ` ${ 
                (trip.budget!==undefined && trip.budget!==null)
                ? trip.budget
                : "-"  }` }</li> 
            </ul> 
          </div>
          <div className = "TripInfo-participants">
            <h2>Participants: </h2> 
            <ul>
              {
                
                (trip.participants.length > 0 )
                ? trip.participants.map( (user, index) => 
                 { if (user!==null) return (<li key = { index }> { user.username } </li>)}
                )
                : "Be the first one and apply!"
              }
            </ul> 
          </div>
          <div className = "TripInfo-map">
            <MapContainer passedPlaces = { trip.places }/>
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