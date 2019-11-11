import React, { Component } from 'react';
import axios from 'axios';
import { connectStore } from '../store';

class AuthForm extends Component {
  state = {
    email: '',
    password: '',
    isLogin: true,
    formTitle: 'Login'
  }

  componentDidMount() {
    this.props.isAuth();
  }

  submitForm = (event) => {
    let url = this.state.isLogin ? '/auth/login' : '/auth/register';
    event.preventDefault();
    // API Route request -- Ajax
    axios.post(url, {
      email: this.state.email,
      password: this.state.password
    }).then(this.props.storeUser).catch(err => console.log(err));
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  setAuthState = (event) => {
    let val;
    let title;
    if (event.target.value === 'register') {
      val = false;
      title = 'Register';
    } else {
      val = true;
      title = 'Login';
    }

    this.setState({
      isLogin: val,
      formTitle: title
    });
  }

  render() {
    return (
      <form className="column" onSubmit={this.submitForm}>
        <h1>{this.state.formTitle}</h1>
        <input type="text" name="email" onChange={this.handleChange} placeholder="Email Address" value={this.state.email} />
        <input type="password" name="password" onChange={this.handleChange} placeholder="Enter Password" value={this.state.password} />
        <button>Submit</button>
        <div className="controls">
          <label>
            Login
            <input type="radio" checked={this.state.isLogin} onChange={this.setAuthState} name="auth" value="login" />
          </label>
          <label>
            Register
            <input type="radio" checked={!this.state.isLogin} onChange={this.setAuthState} name="auth" value="register" />
          </label>
        </div>
      </form>
    );
  }
}

export default connectStore(AuthForm);