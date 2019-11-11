import React, { Fragment } from 'react';
import { connectStore } from '../store';

function Header(props) {
  return (
    <header className="row split">
      <h3>{props.title}</h3>
      <nav>
        {props.logged_in ? (
          <Fragment>
            <span>{props.user.email}</span>
            <button onClick={props.logOut}>Log Out</button>
          </Fragment>
        ) : <button>Log In</button>}
      </nav>
    </header>
  )
}

export default connectStore(Header);