import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import './index.css';
import logo from '../../resources/palm-tree-silhouette-dT7g5MnT9.svg'
import UserActionContainer from '../../containers/UserActionContainer';

class Header extends Component {

  handleHomePage = () => {
    this.props.history.push('/');
  }

  render (){
    return (
      <div className = 'Header' >
        <img onClick = { this.handleHomePage } id = 'logo' src={logo} alt="logo" />
        <UserActionContainer />
      </div>
    )
  }
}

export default withRouter(Header)