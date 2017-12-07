import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';

import { fetchSignIn, fetchUser } from '../../utils/fetch_functions';

const styles = {
  activeButton: {
    backgroundColor: 'rgb(33, 150, 243)',
    marginTop: '10px'
  },
  formField: {
    padding: '5px',
    lineHeight: '25px',
    height: '25px'
  } 
}

class SignInForm extends Component {
  
  constructor () {
    super();

    this.state = {
      username: null,
      password: null,
    }
  }


  handleUsernameChange = (e) => {
    this.setState({
      username: e.currentTarget.value,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.currentTarget.value,
    })
  }
  
  handleSignIn = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.dispatch(fetchSignIn(user))
    .then(() => this.props.dispatch(fetchUser()))
    .then(()=> this.props.history.push('/'));
  }
  
  render() {
    const activeButton = (
      <FlatButton 
      label="Sign in"  
      style = { styles.activeButton }
      onClick = { this.handleSignIn }
    />)
  
    const inactiveButton = (
      <FlatButton 
      label=" " 
      disabled={true}
    />)
  
    const renderButton = (this.state.password !== null && this.state.email !== null) 
      ? activeButton 
      : inactiveButton;

    return (
      <div className = "SignIn">
        <form >
          <TextField
            floatingLabelText = "Username"
            onChange={ this.handleUsernameChange }
          /><br />
          <TextField
            floatingLabelText = "Password"
            type = "password"
            onChange={ this.handlePasswordChange }
          /><br />
          { renderButton }
        </form>
      </div>
    )
  }
}

export default connect()(withRouter(SignInForm))