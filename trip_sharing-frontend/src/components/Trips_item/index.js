import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './index.css'

import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class TripItem extends Component {

  handleGoToTrip = () => {
    this.props.history.push(`/trips/${this.props.trip.id}`)
  }

  render() {
    const { trip } = this.props;
    return(
      <GridTile
        title = { trip.name }
        subtitle = { <span>Host <b> { 
          (trip.host !== undefined ) 
          ? trip.host.username 
          : "Loading..."} </b></span>}
        actionIcon = { <IconButton><StarBorder color="white" /></IconButton> }
        onClick = { this.handleGoToTrip }
      >
        <img src = { trip.photo } alt = "eventPhoto"/>
      </GridTile>
    )
  }
}

export default withRouter(TripItem);