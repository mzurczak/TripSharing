import React, { Component } from 'react'
import logo from '../../resources/palm-tree-silhouette-dT7g5MnT9.svg'
import './index.css';

class TripCoverPhoto extends Component {

  
  render(){
    if (this.props.coverPhotoData !== undefined){
      const { coverPhotoData } = this.props;
      const renderPhoto = () => {
        if (coverPhotoData.photo === null) {
          return logo
        } else {
          return coverPhotoData.photo
        }
      }

      return (
        <div 
          className = "TripCoverPhoto"
          style = { { background: `url(${renderPhoto()}) no-repeat center center`,
            height: "300px", backgroundSize: "cover" }} >
          <h1> { coverPhotoData.name } </h1>
          <h3> { `Hosted by ${ coverPhotoData.host.username} `} </h3>
        </div>
      )
    }
  }
}

export default TripCoverPhoto