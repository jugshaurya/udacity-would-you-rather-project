import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import HomePage from "./HomePage";
import LoginPage from "./LogInPage";
import QuestionPage from "./QuestionPage";
import Navbar from "./Navbar";
import * as DATA from "../utils/_DATA";
import "./App.scss";

class App extends React.Component {
  state = {
    users: null,
    questions: null,
    loggedInUser: {
      id: "tylermcginnis",
      name: "Tyler McGinnis",
      avatarURL: "https://via.placeholder.com/150",
      answers: {
        vthrdm985a262al8qx3do: "optionOne",
        xj352vofupe1dqz9emx13r: "optionTwo",
      },
      questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
    },
  };

  handleChoiceSubmit = async (event, question, option) => {
    event.preventDefault();
    const { loggedInUser } = this.state;

    // change question object in state to include loggedInuser vote in
    // question[option].votes.push(loggedInUser.id) if not already exist
    // also add/update loggedInUser.answers[question.id] = option
    // we have a utility function for this
    await DATA._saveQuestionAnswer({
      authedUser: loggedInUser.id,
      qid: question.id,
      answer: option,
    });

    // fetch in the data again from fake db to retrieve the modified data.
    const users = await DATA._getUsers();
    const questions = await DATA._getQuestions();
    this.setState({
      users,
      questions,
      loggedInUser: this.state.users[loggedInUser.id],
    });
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
              render={(props) => (
                <LoginPage
                  users={users}
                  handleUserLogin={this.handleUserLogin}
                  {...props}
                />
              )}
            />
            <Route
              path="/questions/:question_id"
              render={(props) => (
                <QuestionPage
                  users={users}
                  questions={questions}
                  loggedInUser={loggedInUser}
                  handleChoiceSubmit={this.handleChoiceSubmit}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
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
