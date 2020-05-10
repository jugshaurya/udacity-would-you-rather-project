import React from "react";
import { Switch, Route } from "react-router-dom";

import { connect } from "react-redux";
import { fetchQuestions, fetchUsers } from "../redux/actions";

import LoginPage from "./LogInPage";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import QuestionPage from "./QuestionPage";
import LeaderBoard from "./LeaderBoard";
import AddQuestion from "./AddQuestion";
import "./App.scss";

// require Auth
import requireAuth from "./requireAuth";
const HomePageWithAuth = requireAuth(HomePage);
const QuestionPageWithAuth = requireAuth(QuestionPage);
const LeaderBoardWithAuth = requireAuth(LeaderBoard);
const AddQuestionWithAuth = requireAuth(AddQuestion);

class App extends React.Component {
  componentDidMount() {
    // could have used Promise.all, but have to change the reducers
    this.props.fetchUsers();
    this.props.fetchQuestions();
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Navbar />
          <Switch>
            <Route
              path="/leaderboard"
              component={(props) => (
                <LeaderBoardWithAuth
                  loggedInUser={this.props.loggedInUser}
                  {...props}
                />
              )}
            />
            <Route
              path="/add"
              component={(props) => (
                <AddQuestionWithAuth
                  loggedInUser={this.props.loggedInUser}
                  {...props}
                />
              )}
            />
            <Route
              path="/questions/:question_id"
              component={(props) => (
                <QuestionPageWithAuth
                  loggedInUser={this.props.loggedInUser}
                  {...props}
                />
              )}
            />
            <Route path="/login" component={LoginPage} />
            <Route
              exact
              path="/"
              component={(props) => (
                <HomePageWithAuth
                  loggedInUser={this.props.loggedInUser}
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

const mapStateToProps = (state) => ({
  users: state.users,
  questions: state.questions,
  loggedInUser: state.loggedInUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
