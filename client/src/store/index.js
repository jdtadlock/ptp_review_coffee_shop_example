import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Context = createContext(); // {Provider, Consumer}

class ProviderComponent extends Component {
  state = {
    title: 'Test Another Title',
    user: {},
    logged_in: false
  }

  logOut = () => {
    axios.get('/auth/logout')
      .then(res => {
        this.setState({
          user: {},
          logged_in: false
        });

        this.props.history.push('/');
      });
  }

  isAuth = () => {
    axios.get('/auth/isauth')
      .then(res => {
        if (res.data.user) {
          this.props.history.push('/profile');
        } else {
          this.props.history.push('/');
        }
      });
  }

  storeUser = ({ data }) => {
    this.setState({ user: data.user, logged_in: true });
    this.props.history.push('/profile');
  }

  componentDidMount() {
    axios.get('/auth/isauth')
      .then(res => {
        if (res.data.user) {
          this.setState({
            user: res.data.user,
            logged_in: true
          });
        }
      });
  }


  render() {
    return (
      <Context.Provider value={{
        ...this.state,
        logOut: this.logOut,
        storeUser: this.storeUser,
        isAuth: this.isAuth
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Provider = withRouter(ProviderComponent);

export function connectStore(Dependent) {
  return class extends Component {
    render() {
      return (
        <Context.Consumer>
          {(context) => <Dependent {...context} />}
        </Context.Consumer>
      );
    }
  }
}