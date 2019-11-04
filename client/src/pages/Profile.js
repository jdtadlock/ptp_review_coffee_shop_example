import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Profile extends Component {
  state = {
    email: ''
  }

  componentDidMount() {
    axios.get('/auth/isauth')
      .then(res => {
        if (res.data.user) {
          this.setState({
            email: res.data.user.email
          });
        } else this.props.history.push('/')
      })
  }

  logOut = () => {
    axios.get('/auth/logout')
      .then(res => {
        this.props.history.push('/');
      })
  }


  render() {
    return (
      <div>
        <header className="row split">
          <h3>Logo</h3>
          <nav>
            <span>{this.state.email}</span>
            <button onClick={this.logOut}>Log Out</button>
          </nav>
        </header>
        <h1>Profile</h1>
      </div>
    );
  }
}

export default withRouter(Profile);