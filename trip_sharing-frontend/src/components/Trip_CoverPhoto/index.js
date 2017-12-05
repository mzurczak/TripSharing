import React, { Component } from 'react'

import './index.css';

class TripCoverPhoto extends Component {

  render(){
    return (
      <div 
        className = "TripCoverPhoto"
        style = {
          (this.props !== undefined ) 
          ? { background: `url(${this.props.photoUrl}) no-repeat center center`,
          height: "300px", backgroundSize: "cover" }
          : {}
      } >
        <h1> { 
          (this.props !== undefined) 
          ? this.props.name 
          : "" } 
        </h1>
        <h3> { 
          (this.props.host !== undefined) 
          ? `Hosted by ${ this.props.host} `
          : "" } 
        </h3>
      </div>
    )
  }
}
export default TripCoverPhoto