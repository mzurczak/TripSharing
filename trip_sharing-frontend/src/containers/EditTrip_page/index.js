import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';

import './index.css'

import Header from '../Header';
import { fetchUser } from '../../utils/fetch_functions';

const styles = {
  activeButton: {
    backgroundColor: 'rgb(33, 150, 243)',
    marginTop: '10px'
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: '10px'
  },
}

class EditUser extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchUser())
  }

  constructor () {
    super();

    this.state = {
      // firstName: null,
      // lastName: null,
      // email: null,
      // currentPassword: null,
      // newPassword: null,
      // passwordConfirmed: false,
    }
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

  handleCurrentPasswordChange = (e) => {
    this.setState({
      currentPassword: e.currentTarget.value,
    })
  }
  handleNewPasswordChange = (e) => {
    this.setState({
      newPassword: e.currentTarget.value,
    })
  }

  handlePasswordConfirmation = (e) => {
    e.preventDefault();
    this.setState({
      passwordConfirmed: (this.state.newPassword === e.currentTarget.value)
    }) 
  }

  // handleDeleteConfirmation = (e) => {
  //   e.preventDefault();
  //   return ((this.state.newPassword === e.currentTarget.value))
  // }
  
  // handleEdit = (e) => {
  //   e.preventDefault();
  //   let newData = { ...this.state }
  //   let userId = this.props.user.id;
  //   this.props.dispatch(fetchEditUser(newData, userId))
  //     .then(() => {
  //       this.setState({})
  //       this.props.history.push("/")
  //     });
  // }
  
  // handleDelete = (e) => {
  //   e.preventDefault();
  //   let userId = this.props.user.id;
  //   this.props.dispatch(fetchDeleteUser(userId))
  //     .then(() => {
  //       localStorage.clear()
  //       this.props.dispatch(fetchRestaurantList())
  //       this.props.history.push("/")
  //     });
  // }
  
  render() {
  
    const activeButton = (
      <FlatButton 
      label="Send changes"  
      style = { styles.activeButton }
      onClick = { this.handleEdit }
    />)
    
    const deleteButton = (
      <FlatButton 
      label="Delete account"  
      style = { styles.deleteButton }
      onClick = { this.handleEdit }
    />)
  
    const inactiveButton = (
      <FlatButton 
      label=" "  
      disabled={true}
    />)
  
    const renderButton =  activeButton;

    return (
      <div>
        <Header />
        <div className="Edit-body">
          <h2>Edit your profile </h2>
          <form>
            <TextField
              hintText = "First name"
              floatingLabelText = "First name"
              onChange={ this.handleFirstNameChange }
            /><br />
            <TextField
              hintText = "Last name"
              floatingLabelText = "Last name"
              onChange={ this.handleLastNameChange }
            /><br />
            <TextField
              hintText = "example@example.com"
              floatingLabelText = "Email"
              onChange={ this.handleEmailChange }
            /><br />
            <TextField
              hintText = "New password"
              floatingLabelText = "New password"
              type = "password"
              onChange={ this.handleNewPasswordChange }
            /><br />
            <TextField
              hintText = "Confirm new password"
              floatingLabelText = "Confirm new password"
              type = "password"
              onChange={ this.handlePasswordConfirmation }
            /><br />
            { activeButton }
            <FlatButton 
              label="Delete account"  
              style = { styles.deleteButton }
              onClick = { this.handleDelete }
            />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( {userReducer} ) => {

  return({
    user: userReducer.userInfo
  })
}
export default connect(mapStateToProps)(withRouter(EditUser))