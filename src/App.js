import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LogInPage";
import Navbar from "./components/Navbar";
import * as DATA from "./_DATA";
import "./App.css";

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
  }

  handleUserLogin = (event, history) => {
    const loggedInUser = event.target.value;
    this.setState({ loggedInUser });
    history.push("/");
  };

  handleUserLogout = (event, history) => {
    history.push("/login");
    this.setState({ loggedInUser: null });
  };

  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="App">
        <div>
          <Navbar
            loggedInUser={loggedInUser}
            handleUserLogout={this.handleUserLogout}
          />
          <Switch>
            <Route
              path="/login"
              component={(props) => (
                <LoginPage
                  users={this.state.users}
                  handleUserLogin={this.handleUserLogin}
                  {...props}
                />
              )}
            />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
