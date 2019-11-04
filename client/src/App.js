import React, { Component } from 'react';
// import axios from 'axios';
import { Route } from 'react-router-dom';

import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

class App extends Component {
  // testRequest() {
  //   axios.get('/api/test')
  //     .then(res => {
  //       console.log(res.data);
  //     });
  // }

  render() {
    return (
      <div>
        <Route path="/" exact component={SignUp} />
        <Route path="/profile" exact component={Profile} />
      </div>
    )
  }
}

export default App;
