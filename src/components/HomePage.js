import React, { Component } from "react";
import { connect } from "react-redux";
class HomePage extends Component {
  state = {
    showAnsweredSection: false,
  };

  setShow = (val) => {
    this.setState({ showAnsweredSection: val });
  };

  renderQuestions = () => {
    const {
      history,
      questions,
      users,
      loggedInUser: { id: userID },
    } = this.props;

    const { showAnsweredSection } = this.state;
    const questionArray = Object.keys(questions).map((key) => questions[key]);
    const answeredQuestions = questionArray.filter(
      (question) =>
        question.optionOne.votes.includes(userID) ||
        question.optionTwo.votes.includes(userID)
    );

    const unansweredQuestions = questionArray.filter(
      (question) =>
        !question.optionOne.votes.includes(userID) &&
        !question.optionTwo.votes.includes(userID)
    );

    let requiredQuestions = showAnsweredSection
      ? answeredQuestions
      : unansweredQuestions;

    return requiredQuestions.map((question) => (
      <div className="question" key={question.id}>
        <article>{users[question.author].name} asks: </article>
        <main>
          <div className="avatar">
            <img src={users[question.author].avatarURL} alt="avatar" />
          </div>
          <div className="question-detail">
            <div className="game-name">Would you rather</div>
            <button
              onClick={() => {
                history.push(`/questions/${question.id}`);
              }}
            >
              View Poll
            </button>
          </div>
        </main>
      </div>
    ));
  };

  render() {
    const { showAnsweredSection } = this.state;
    console.log("dsf3434", this.props);
    return (
      <div className="home-page">
        <header>
          <div
            className="unanswered"
            onClick={() => this.setShow(false)}
            style={{
              background: showAnsweredSection ? "none" : "#364f6b",
              color: showAnsweredSection ? "#364f6b" : "white",
            }}
          >
            UnAnswered Questions
          </div>
          <div
            onClick={() => this.setShow(true)}
            className="answered"
            style={{
              background: showAnsweredSection ? "#364f6b" : "none",
              color: showAnsweredSection ? "white" : "#364f6b",
            }}
          >
            Answered Questions
          </div>
        </header>

        <section>
          <div>{this.renderQuestions()}</div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  questions: state.questions,
  loggedInUser: state.loggedInUser,
});

export default connect(mapStateToProps)(HomePage);
