import React, { Component } from 'react';
import { connect } from 'react-redux';

import CoverPhoto from '../../components/CoverPhoto';
import Header from '../../components/Header';
import ReviewList from '../../components/ReviewList';
import UserCard from '../UserCard';

import './index.css';

import { fetchSpecificUser } from '../../utils/userFetch_functions'

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchSpecificUser(this.props.match.params.userId))
  }

  render(){
    const { userId, reviews, specificUser } = this.props
    if (this.props.specificUser !== undefined){
      return (
        <div >
          <Header />
          <div className = "UserPage-body">
            <CoverPhoto coverPhotoData = { this.props.specificUser } id = { userId }/>
            <UserCard userInfo = { specificUser }/>
            <ReviewList reviews = { reviews }/>
          </div>
        </div>
      )
    } else {
      return <Header />
    }
  }
}

const mapStateToProps = ({ userReducer }, props) => {
  if (userReducer.specificUser !== undefined){
    const userId = props.match.params.userId;
    const specificUser = {...userReducer.specificUser};
    const reviews = specificUser.reviewsReceived;
    const hostedTrips = specificUser.tripsHosted
    return ({
      userId,
      specificUser,
      hostedTrips,
      reviews
    });
  } else {
    return ({})
  }
}
export default connect(mapStateToProps)(UserPage);