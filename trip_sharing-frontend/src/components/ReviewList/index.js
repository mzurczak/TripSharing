import React, { Component } from 'react';

import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';


import './index.css'
import ReviewItem from '../../containers/ReviewItem'

class ReviewList extends Component {

  render(){
    const { reviews } = this.props;
    return(
      <div className="ReviewList"> 
        <h2>Reviews</h2>
        <List>
          <Divider />
          {
            (reviews === undefined) ? "" :
            reviews.map( (review, index) => {
              return <ReviewItem key = { index } review = { review }/>
            })
          }
        </List>
      </div>
    )
  }
}

export default ReviewList;