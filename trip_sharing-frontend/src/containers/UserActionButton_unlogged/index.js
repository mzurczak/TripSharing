import React, { Component } from 'react';

import './index.css';

import SignIn from 'material-ui/svg-icons/action/input'
import SignUp from 'material-ui/svg-icons/social/person-add'
import {Tabs, Tab} from 'material-ui/Tabs';

import SignUpForm from '../SignUp_form';
import SignInForm from '../SignIn_form';

export default class UserActionButtons_unlogged extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'Sign in',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    
    return (
      <div className = "UserButtons-unlogged">
        <Tabs
          tabItemContainerStyle = {{
            backgroundColor: 'Aquamarine',
            color: 'black'
          }}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab 
            icon={<SignIn style={{color: 'black'}} />}
            label="Sign in"
            style={{color: 'black'}}
            value="Sign in">
              <h2>Sign in!</h2>
              <SignInForm />
          </Tab>
          <Tab label= "Sign Up" 
            icon={<SignUp style={{color: 'black'}}/>}
            value="Sign up"
            style={{color: 'black'}}
          >
            <h2>Sign up to TripSharing!</h2>
            <SignUpForm />
          </Tab>
        </Tabs>
      </div>
    );
  }
}