import React, { Component } from 'react';

import './index.css';

import Unlogged from '../../containers/UserActionButton_unlogged';
import Logged from '../../containers/UserActionButton_logged';

export default class UserActionMenu extends Component {
  
  render() {
    
    const renderMenu = () => (localStorage.getItem('token'))
        ? <Logged />
        : <Unlogged />
    
    return (
      <div className = "UserActionMenu">
        { renderMenu() }
      </div>
    );
  }
}