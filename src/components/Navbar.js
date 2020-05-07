import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class Navbar extends Component {
  state = {};
  render() {
    const { loggedInUser, handleUserLogout, history } = this.props;
    return (
      <div className="navbar">
        <Link to="/"> Home </Link>
        {loggedInUser ? (
          <>
            <div className="name">{loggedInUser}</div>
            <Link onClick={(event) => handleUserLogout(event, history)}>
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login"> Login </Link>
        )}
      </div>
    );
  }
}

export default withRouter(Navbar);
