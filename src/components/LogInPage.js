import React, { Component } from "react";
import { ReactComponent as PlayStation } from "../playstation.svg";
class LoginPage extends Component {
  renderUsers(users) {
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

  render() {
    const { users, handleUserLogin, history } = this.props;
    return (
      <div className="login-page">
        <header>
          Welcome to the <strong> Would You Rather?</strong>
        </header>
        <PlayStation />
        <div className="select-user">
          <h3>Who are You ? </h3>
          <select onClick={(event) => handleUserLogin(event, history)}>
            <option value="none" disabled></option>
            {this.renderUsers(users)}
          </select>
        </div>
        <footer>Please Signin</footer>
      </div>
    );
  }
}

export default LoginPage;
