import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

const LeaderBoard = ({ users }) => {
  const sortByScore = (usersArray) => {
    return _.sortBy(
      usersArray,
      (user) => user.questions.length + Object.keys(user.answers).length
    ).reverse();
  };

  const displayCard = (user) => {
    const answeredCount = Object.keys(user.answers).length;
    const questionsCount = user.questions.length;
    const totalScore = answeredCount + questionsCount;
    return (
      <div className="card" key={user.id}>
        <div className="left">
          <div className="avatar">
            <img src={user.avatarURL} alt="avatar" />
          </div>
        </div>
        <div className="middle">
          <div className="top">{user.name}</div>
          <div className="answered">Answered: {answeredCount}</div>
          <div className="questions">Questions: {questionsCount}</div>
        </div>
        <div className="right">
          <div className="top">Score</div>
          <div className="score">{totalScore}</div>
        </div>
      </div>
    );
  };

  const usersArray = Object.keys(users).map((key) => users[key]);
  const sortedUsersArray = sortByScore(usersArray);

  return (
    <div className="leaderboard">
      <div className="users-cards">
        {sortedUsersArray.map((user) => displayCard(user))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  loggedInUser: state.loggedInUser,
});

export default connect(mapStateToProps)(LeaderBoard);
