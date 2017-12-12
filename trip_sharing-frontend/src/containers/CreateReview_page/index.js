import React, {Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';

import { Rating } from 'material-ui-rating'

import './index.css'
import Header from '../../components/Header'
import { fetchNewReview } from '../../utils/userFetch_functions'

const styles = {
  activeButton: {
    backgroundColor: 'rgb(33, 150, 243)',
    marginTop: '10px'
  },
  
  linkedButton: {
    padding: '0px',
    fontSize: '15px'
  },

  textField: {
    width: '600px'
  }
}

class CreateReviewPage extends Component {

  constructor () {
    super();

    this.state = {
      review: '',
      rating: 0
    }
  }

  handleRating = (rate) => {
    this.setState({
      rating: rate,
    })
  }

  handleMessageChange = (e) => {
    this.setState({
      review: e.currentTarget.value,
    });
  }

  handleNewReview = (e) => {
    e.preventDefault();
    const newReview = {
      rating: this.state.rating,
      review: this.state.review,
      userId: this.props.match.params.userId
    }
    this.props.dispatch(fetchNewReview(newReview))
      .then(() => {
      this.props.history.push(`/user/${newReview.userId}`)}
    );
  }

  render(){
    const activeButton = (
      <FlatButton 
      label="Create review"  
      style = { styles.activeButton }
      onClick = { this.handleNewReview }
    />)
  
    const inactiveButton = (
      <FlatButton 
      label=" "  
      disabled={true}
    />)
  
    const renderButton = (this.state.review && this.state.rating>0) ? activeButton : inactiveButton;

    return(
      <div>
        <Header />
        <div className = "Review">
        <h2>New review</h2>
        <Rating
          value = { this.state.rating }
          max = { 5 }
          onChange = { (e) => {
            this.handleRating(e)
            }
          }
        /> 
          <form>
            <TextField
            styles = { styles.textField }
            fullWidth = { true }
            multiLine = { true }
            rows = {5}
            floatingLabelText = "New review"
            onChange={ this.handleMessageChange }
            /><br />
            { renderButton }
            <br />
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(CreateReviewPage)) 