import React, { Component } from "react";
import { connect } from "react-redux";
import { setLoggedInUser } from "../redux/actions";
import { ReactComponent as PlayStation } from "../assets/playstation.svg";
class LoginPage extends Component {
  state = {
    selectedUser: "none",
  };

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
    event.preventDefault();
    const { selectedUser } = this.state;
    const { history, location, setLoggedInUser } = this.props;
    if (selectedUser === "none") return;
    setLoggedInUser(selectedUser);
    history.push(location.state.returnPath);
  };

  handleChange = (event) => {
    this.setState({ selectedUser: event.target.value });
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
          <form onSubmit={this.handleUserLogin}>
            <select
              onClick={(event) => this.handleChange(event)}
              defaultValue={this.state.selectedUser}
            >
              <option value="none" disabled>
                {" "}
                Choose User
              </option>
              {this.renderUsers()}
            </select>
            <br />
            <button>Login</button>
          </form>
        </div>
        <footer>Please Login</footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  setLoggedInUser: (userID) => dispatch(setLoggedInUser(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
