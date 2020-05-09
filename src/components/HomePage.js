import React, { Component } from "react";
class HomePage extends Component {
  state = {
    showAnsweredSection: false,
  };

  componentDidMount() {
    if (this.props.loggedInUser === null)
      return this.props.history.push("/login");
  }

  setShow = (val) => {
    this.setState({ showAnsweredSection: val });
  };

  renderQuestions = (questions, users) => {
    const { history } = this.props;
    return questions.map((question) => (
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
    const { questions, loggedInUser, users } = this.props;
    if (!users || !questions) return null;

    if (loggedInUser === null) return null;

    const loggedInUserID = loggedInUser.id;
    const { showAnsweredSection } = this.state;
    const questionArray = Object.keys(questions).map((key) => questions[key]);
    const answeredQuestionsByLoggedInUser = questionArray.filter(
      (question) =>
        question.optionOne.votes.includes(loggedInUserID) ||
        question.optionTwo.votes.includes(loggedInUserID)
    );
    const unansweredQuestionsByLoggedInUser = questionArray.filter(
      (question) =>
        !question.optionOne.votes.includes(loggedInUserID) &&
        !question.optionTwo.votes.includes(loggedInUserID)
    );

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

        {showAnsweredSection ? (
          <section>
            <div>
              {this.renderQuestions(answeredQuestionsByLoggedInUser, users)}
            </div>
          </section>
        ) : (
          <section>
            <div>
              {this.renderQuestions(unansweredQuestionsByLoggedInUser, users)}
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default HomePage;
