import React, { Component } from "react";

class LoginPage extends Component {
  renderUsers(users) {
    const userKeys = Object.keys(users);
    return userKeys.map((userKey) => {
      const user = users[userKey];
      return (
        <option value={user.name} key={user.id}>
          {user.name}
        </option>
      );
    });
  }

  render() {
    const { users, handleUserLogin, history } = this.props;
    return (
      <div className="login-page" style={{ background: "lightblue" }}>
        <div>LoginPage</div>
        <div className="select-user">
          <select
            defaultValue={"move"}
            onClick={(event) => handleUserLogin(event, history)}
          >
            <option value="move" disabled>
              Login as...
            </option>
            {this.renderUsers(users)}
          </select>
        </div>
        <ul className="users"></ul>
      </div>
    );
  }
}

export default LoginPage;
