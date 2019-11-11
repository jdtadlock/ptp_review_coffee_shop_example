import React, { Component } from 'react';
// import axios from 'axios';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import AuthForm from './pages/AuthForm';
import Profile from './pages/Profile';

class App extends Component {

  render() {
    return (
      <div>
        <Header />

        <div className="container">
          <Route path="/" exact component={AuthForm} />
          <Route path="/profile" exact component={Profile} />
        </div>
      </div>
    )
  }
}

export default App;
