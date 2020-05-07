import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class Navbar extends Component {
  state = {};
  render() {
    const { loggedInUser, handleUserLogout, history } = this.props;
    return (
      <div className="navbar">
        <Link to="/"> Home </Link>
        <Link to="/"> New Question </Link>
        <Link to="/"> Leader Board </Link>
        <div className="user-panel">
          {loggedInUser ? (
            <>
              <div className="username">Hello, {loggedInUser.name}</div>
              <Link
                to="/"
                onClick={(event) => handleUserLogout(event, history)}
              >
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login"> Login </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
