import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './index.css';

import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { GridList } from 'material-ui/GridList';
import { Rating } from 'material-ui-rating';

import TripItem from '../../components/Trips_item';

const styles = {
  activeButton: {
    backgroundColor: 'rgb(33, 150, 243)',
    marginBottom: '10px',
    marginLeft: '55px'
  },
}

class UserCard extends Component {

  handleNewReview = () => {
    this.props.history.push(`/user/${this.props.userInfo.id}/newReview`)
  }

  calculateRating = (reviews) => {
    var sum = 0;
    if(reviews === undefined) {
      return (
        <Rating
        value = { 0 }
        readOnly = { true }
        max = { 5 } />)
    } else {
      reviews.forEach((review) => {
        sum += review.rating;
      })
      const rate = sum / reviews.length;
      return (
        <Rating
        value = { rate }
        readOnly 
        max = { 5 }/>
      )
    }
  }

  render() {
    const renderReviewButton = () => {
      if (this.props.user !== undefined && this.props.user.id !== this.props.userInfo.id){
        return <FlatButton 
          label="Write a Review"  
          style = { styles.activeButton }
          onClick = { this.handleNewReview }
        />
      }
    }

    const { userInfo } = this.props
    return(
      <div className = "UserCard-body">
        <div className = "UserCard-userInfo">
          <h2>{ `${ this.props.userInfo.username} at glance:`}</h2> 
          <Divider />
          {(userInfo.aboutMe !== undefined)
          ? (<div>
            <h3> About myself: </h3>
            <p> {`${ userInfo.aboutMe  }`} </p>
          </div>)
          :''}
          <h3> {`Trips hosted : ${ userInfo.tripsHosted.length}`} </h3><br />  
          <h3> {`Rating :`} </h3>  
          { this.calculateRating(userInfo.reviewsReceived) }
          { renderReviewButton() } 
        </div>
        <div className = "UserCard-tripsList">
          <h2>{ `Trips hosted by ${ this.props.userInfo.username}`}</h2><br/>
          <Divider />
          <GridList
            className = "UserCard-gridList"
            cols = { 4 }
            padding = { 15 }
          >
            { (userInfo.tripsHosted !== 0)
              ? Object.values(userInfo.tripsHosted).map((trip, index) => (
              <TripItem trip = { trip } key = { index }/>
            ))
            : `${ this.props.userInfo.username} did not organized trip so far.`
          }
          </GridList>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( { userReducer } ) => {
  return({
    user: userReducer.userInfo
  })
}

export default connect(mapStateToProps)(withRouter(UserCard));