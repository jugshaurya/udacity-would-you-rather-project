import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LogInPage";
import Navbar from "./components/Navbar";
import * as DATA from "./_DATA";
import "./App.scss";

class App extends React.Component {
  state = {
    users: {},
    questions: {},
    loggedInUser: null,
  };

  async componentDidMount() {
    const usersObj = await DATA._getUsers();
    const questionsObj = await DATA._getQuestions();
    this.setState({ users: usersObj, questions: questionsObj });
    if (this.state.loggedInUser === null)
      return this.props.history.push("/login");
  }

  handleUserLogin = (event, history) => {
    const loggedInUser = event.target.value;
    this.setState({ loggedInUser: this.state.users[loggedInUser] });
    history.push("/");
  };

  handleUserLogout = (event, history) => {
    history.push("/login");
    this.setState({ loggedInUser: null });
  };

  render() {
    const { loggedInUser, users, questions } = this.state;
    return (
      <div className="App">
        <div className="wrapper">
          <Navbar
            loggedInUser={loggedInUser}
            handleUserLogout={this.handleUserLogout}
          />
          <Switch>
            <Route
              path="/login"
              component={(props) => (
                <LoginPage
                  users={users}
                  handleUserLogin={this.handleUserLogin}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/"
              component={(props) => (
                <HomePage
                  questions={questions}
                  loggedInUser={loggedInUser}
                  users={users}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
