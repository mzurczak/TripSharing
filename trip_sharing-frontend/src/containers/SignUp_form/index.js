import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';

import './index.css'
import { fetchNewUser, fetchSignIn } from '../../utils/userFetch_functions';

const styles = {
  activeButton: {
    backgroundColor: 'rgb(33, 150, 243)',
    marginTop: '10px'
  },

  formField: {
    height: '45px',
  } 
}

class SignUpForm extends Component {
  
  constructor () {
    super();

    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmed: false,
    }
  }

  handleUserNameChange = (e) => {
    this.setState({
      username: e.currentTarget.value,
    })
  }

  handleFirstNameChange = (e) => {
    this.setState({
      firstName: e.currentTarget.value,
    })
  }

  handleLastNameChange = (e) => {
    this.setState({
      lastName: e.currentTarget.value,
    })
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.currentTarget.value,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.currentTarget.value,
    })
  }

  handlePasswordConfirmation = (e) => {
    e.preventDefault();
    this.setState({
      passwordConfirmed: (this.state.password === e.currentTarget.value)
    }) 
  }
  
  handleSignUp = (e) => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }
    this.props.dispatch(fetchNewUser(newUser));
  }
  
  render() {
  
    const activeButton = (
      <FlatButton 
      label="Sign up"  
      style = { styles.activeButton }
      onClick = { this.handleSignUp }
    />)
  
    const inactiveButton = (
      <FlatButton 
      label=" "  
      disabled={true}
    />)
  
    const renderButton = (this.state.passwordConfirmed) ? activeButton : inactiveButton;

    return (
      <div className = "SignUp">
        <form>
          <TextField
            floatingLabelText = "Username"
            onChange={ this.handleUserNameChange }
          /><br />
          <TextField
            floatingLabelText = "First name"
            onChange={ this.handleFirstNameChange }
          /><br />
          <TextField
            floatingLabelText = "Last name"
            onChange={ this.handleLastNameChange }
          /><br />
          <TextField
            floatingLabelText = "Email"
            onChange={ this.handleEmailChange }
          /><br />
          <TextField
            floatingLabelText = "Password"
            type = "password"
            onChange={ this.handlePasswordChange }
          /><br />
          <TextField
            floatingLabelText = "Confirm password"
            type = "password"
            onChange={ this.handlePasswordConfirmation }
          /><br />
          { renderButton }
        </form>
      </div>
    )
  }
}

export default connect()(withRouter(SignUpForm))