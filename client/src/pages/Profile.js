import React, { Component } from 'react';
import { connectStore } from '../store';

class Profile extends Component {
  state = {
    email: ''
  }

  componentDidMount() {
    this.props.isAuth();
  }


  render() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
}

export default connectStore(Profile);