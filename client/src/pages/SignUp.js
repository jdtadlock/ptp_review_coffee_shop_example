import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class SignUp extends Component {
  state = {
    email: '',
    password: ''
  }

  submitForm = (event) => {
    event.preventDefault();

    // API Route request -- Ajax
    axios.post('/auth/register', {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      this.props.history.push('/profile');
    });

  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form className="column" onSubmit={this.submitForm}>
        <h1>Register</h1>
        <input type="text" name="email" onChange={this.handleChange} placeholder="Email Address" value={this.state.email} />
        <input type="password" name="password" onChange={this.handleChange} placeholder="Enter Password" value={this.state.password} />
        <button>Submit</button>
      </form>
    );
  }
}

export default withRouter(SignUp);