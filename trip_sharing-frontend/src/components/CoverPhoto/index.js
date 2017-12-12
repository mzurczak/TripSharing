import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../resources/palm-tree-silhouette-dT7g5MnT9.svg';
import defaultUserPhoto from '../../resources/blank-profile-picture.png';

import './index.css';

class CoverPhoto extends Component {

  
  render(){
    if (this.props.coverPhotoData !== undefined){
      const { coverPhotoData, typeOfPhoto } = this.props;
      const renderTripCoverPhoto = () => {
        if (coverPhotoData.photo === null) {
          return logo
        } else {
          return coverPhotoData.photo
        }
      }

      const renderUserCoverPhoto = () => {
        if (coverPhotoData.coverPhoto === null || coverPhotoData.coverPhoto === undefined ) {
          return logo
        } else {
          return coverPhotoData.CoverPhoto
        }
      }
      
      const renderUserPhoto = () => {
        if (coverPhotoData.userPhoto === null || coverPhotoData.userPhoto === undefined ) {
          return <img src = { defaultUserPhoto } alt = "Profile_picture" height = {'150px'} />
        } else {
          return <img src = { coverPhotoData.userPhoto } alt = "Profile_picture" />
        }
      }

      return (
        (typeOfPhoto === 'tripCoverPhoto')
        ? (<div 
          className = "CoverPhoto" 
          style = { 
            {background: `url(${renderTripCoverPhoto()}) no-repeat center center`,
            height: "300px", 
            backgroundSize: "cover" }
        }>
          <h1> { coverPhotoData.name } </h1>
          <h3> { 
            <Link to = {`/user/${coverPhotoData.host.id}`} >
            { `Hosted by ${ coverPhotoData.host.username} `} </Link> }
          </h3>    
        </div> )
        : (<div 
          className = "CoverPhoto" 
          style = { { background: `url(${renderUserCoverPhoto()}) no-repeat center center`,
          height: "300px", 
          backgroundSize: "cover" }
        }>
          { renderUserPhoto() }
          <h3> { 
            `${ coverPhotoData.firstName} ${ coverPhotoData.lastName}`} 
          </h3>    
        </div> )
      )
    }
  }
}

export default CoverPhoto