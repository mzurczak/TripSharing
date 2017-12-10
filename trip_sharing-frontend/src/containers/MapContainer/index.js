import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { fetchCoordinates } from '../../utils/fetch_functions'

class MapContainer extends Component {

  componentDidMount() {
    this.props.passedPlaces.forEach( place => {
      this.props.dispatch(fetchCoordinates(place))
    })  
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
    // ...
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.google !== this.props.google) {
  //     this.loadMap();
  //     // this.recenterMap();
  //   }
  // }
  
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
  const initial = placesOfTrip.coordinates[0];
  const places = placesOfTrip.coordinates.slice(1);
  return({
    initial,
    places
  })
}
export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: "AIzaSyAtZmX6xZzKxK8oYR1LyJT8CexxG4-m0sA"
})(MapContainer))