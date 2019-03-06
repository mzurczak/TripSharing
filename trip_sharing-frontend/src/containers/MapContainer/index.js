import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { fetchCoordinates, clearCoordinates } from '../../utils/mapFetch_functions'

class MapContainer extends Component {

  componentDidMount() {
    this.props.dispatch(clearCoordinates());
    this.props.dispatch(fetchCoordinates(this.props.passedPlaces))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.placesOfTrip !== this.props.placesOfTrip) {
      Map.recenterMap();
      Map.loadMap();
    }
    window.scroll(0,0)
  }
  
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <Map 
        google={this.props.google} 
        style = {{width: '80%', height: '300px'}}
        initialCenter={{
          lat: this.props.initial.lat, 
          lng: this.props.initial.lng
        }}
        zoom = {5}>
        {
          this.props.places.map( (place, index) => {
           return <Marker key = { index }
            position={{lat: place.lat, lng: place.lng}} />
          })
        }
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{'this.state.selectedPlace.name'}</h1>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

const mapStateToProps = ({ coordinatesReducer }) => {
  const placesOfTrip = {...coordinatesReducer};
  let initial;
  if(placesOfTrip.coordinates[1] !== undefined) {
    initial = placesOfTrip.coordinates[1];
  } else {
    initial = {lat: 47.390960, lng: 8.516318}
  }
  const places = placesOfTrip.coordinates.slice(1);
  return({
    initial,
    places
  })
}
export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: "AIzaSyAtZmX6xZzKxK8oYR1LyJT8CexxG4-m0sA"
})(MapContainer))