import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css'

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';


class TripInfo extends Component {

  render(){
    console.log(this.props.trip);
    return(
      <FlatButton
      style = {{backgroundColor: "Aquamarine", color: "black"}}
      label="Join trip"
      labelPosition="after"
      primary={true}
      icon={
        <FontIcon className="material-icons" hoverColor = "white" style = {{cursor: "pointer"}}>add_circle</FontIcon>
      }
    />
    )
  }
}

const mapStateToProps = ( {tripsReducer} ) => {
  return ({
    trip: tripsReducer.trips
  })
}

export default connect(mapStateToProps)(TripInfo);