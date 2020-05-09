import React from "react";
import { connect } from "react-redux";

const LeaderBoard = ({ users }) => {
  const displayCard = (user) => {
    const answeredCount = Object.keys(user.answers).length;
    const questionsCount = user.questions.length;
    const totalScore = answeredCount + questionsCount;
    return (
      <div className="card">
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
          <div className="questions">Score: {totalScore}</div>
        </div>
      </div>
    );
  };

  const usersArray = Object.keys(users).map((key) => users[key]);
  return (
    <div className="leaderboard">
      <div className="users-cards">
        {usersArray.map((user) => displayCard(user))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  loggedInUser: state.loggedInUser,
});

export default connect(mapStateToProps)(LeaderBoard);
