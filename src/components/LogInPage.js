import React, { Component } from "react";
import { connect } from "react-redux";
import { setLoggedInUser } from "../redux/actions";
import { ReactComponent as PlayStation } from "../assets/playstation.svg";

class LoginPage extends Component {
  renderUsers() {
    const { users } = this.props;
    const userKeys = Object.keys(users);

    return userKeys.map((userKey) => {
      const user = users[userKey];
      return (
        <option value={user.id} key={user.id}>
          {user.name}
        </option>
      );
    });
  }

  handleUserLogin = (event) => {
    const userID = event.target.value;
    if (userID === "none") return;
    this.props.setLoggedInUser(userID);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="login-page">
        <header>
          Welcome to the <strong> Would You Rather?</strong>
        </header>
        <PlayStation />
        <div className="select-user">
          <h3>Who are You ? </h3>
          <select
            onClick={(event) => this.handleUserLogin(event)}
            defaultValue="none"
          >
            <option value="none" disabled>
              {" "}
              Choose User
            </option>
            {this.renderUsers()}
          </select>
        </div>
        <footer>Please Signin</footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  loggedInUser: state.loggedInUser,
});

const mapDispatchToProps = (dispatch) => ({
  setLoggedInUser: (userID) => dispatch(setLoggedInUser(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
