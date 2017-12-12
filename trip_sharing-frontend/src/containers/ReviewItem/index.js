import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment';

// import FlatButton from 'material-ui/FlatButton'
import { Rating } from 'material-ui-rating';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Remove from 'material-ui/svg-icons/action/delete';

import { fetchDeleteReview, fetchSpecificUser } from '../../utils/userFetch_functions'


import './index.css'

class ReviewItem extends Component {

  handleDelete = () => {
    const reviewedUserId = this.props.match.params.userId;
    const reviewId = this.props.review.id;
    this.props.dispatch(fetchDeleteReview(reviewedUserId, reviewId))
      .then(this.props.dispatch(fetchSpecificUser(reviewedUserId)))
      .then(this.props.history.push(`/user/${reviewedUserId}`))
  }

  calcAge = (created) => {
    var newDate = created.slice(0, 3).join("-").concat('T');
    newDate = newDate.concat(created.slice(3, 5).join(":"));
    let moment = new Moment(newDate);
    let age = moment.toNow(true);
    return age;
  }

  render(){

    const deleteButton = (<Remove style = {{cursor: "pointer"}}
      onClick = { this.handleDelete } />)
      console.log(this.props);
    const renderDelete = () => (this.props.review.author.id === this.props.user.id ? deleteButton : null) ;
    if(this.props.user !== undefined){
      return(
        <div className = "ReviewItem">
          <div className = "ReviewItem-header">
            <ListItem
              primaryText =  { 
                `${this.props.review.author.firstName} 
                ${this.props.review.author.lastName} `
                
              }
              secondaryText = {
                `${ this.calcAge(this.props.review.dateCreated) } ago`
              }
            />
            <div className = "Rate">
              <Rating
                value = { this.props.review.rating }
                readOnly = { true }
                max = { 5 }
              />
            </div>
            { renderDelete() }
            </div>
          <ListItem
            primaryText = {this.props.review.text}
            />
          <Divider />  
        </div>        
      )
    }
  }  
}

const mapStateToProps = ( {userReducer} ) => {
  return({
    user: userReducer.userInfo
  })
}
export default connect(mapStateToProps)(withRouter(ReviewItem));