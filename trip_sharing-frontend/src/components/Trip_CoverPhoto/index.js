import React, { Component } from 'react'
import logo from '../../resources/palm-tree-silhouette-dT7g5MnT9.svg'
import './index.css';

class TripCoverPhoto extends Component {

  
  render(){
    const renderPhoto = () => {
      if (this.props.photoUrl === null) {
        return logo
      } else {
        return this.props.photoUrl 
      }
    }
    
    if (this.props !== undefined){
      return (
        <div 
          className = "TripCoverPhoto"
          style = { { background: `url(${renderPhoto()}) no-repeat center center`,
            height: "300px", backgroundSize: "cover" }} >
          <h1> { this.props.name } </h1>
          <h3> { `Hosted by ${ this.props.host} `} </h3>
        </div>
      )
    }
  }
}
export default TripCoverPhoto