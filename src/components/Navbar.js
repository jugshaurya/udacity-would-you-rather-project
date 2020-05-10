import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { logoutUser } from "../redux/actions";

import { connect } from "react-redux";
class Navbar extends Component {
  render() {
    const { loggedInUser, history } = this.props;
    return (
      <div className="navbar">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/add">
          New Question
        </NavLink>
        <NavLink exact to="/leaderboard">
          Leader Board
        </NavLink>
        <div className="user-panel">
          {loggedInUser.id ? (
            <>
              <div className="username">Hello, {loggedInUser.name}</div>
              <Link
                to="/"
                onClick={() => {
                  this.props.logoutUser();
                  history.push("/login");
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <NavLink exact to="/login">
              {" "}
              Login{" "}
            </NavLink>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.loggedInUser,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
