import React, { Component } from "react";
import { connect } from "react-redux";
import { saveQuestionAnswer } from "../redux/actions";

class QuestionPage extends Component {
  state = {
    option: "optionOne",
  };

  handleOptionSelect = (option) => this.setState({ option });

  handleSubmit = (event, qid) => {
    event.preventDefault();
    this.props.saveQuestionAnswer(qid, this.state.option);
    this.props.history.push(`/questions/${qid}`);
  };

  render() {
    const { option } = this.state;
    const { users, loggedInUser, question, id } = this.props;
    const optionOne = question.optionOne;
    const optionTwo = question.optionTwo;
    const isAvailableInChoiceOne = optionOne.votes.includes(loggedInUser.id);
    const isAvailableInChoiceTwo = optionTwo.votes.includes(loggedInUser.id);
    const isAnsweredByLoggedinUser =
      isAvailableInChoiceOne || isAvailableInChoiceTwo;
    const optionOneVotes = optionOne.votes.length;
    const optionTwoVotes = optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePercentage = parseInt((optionOneVotes / totalVotes) * 100);
    const optionTwoPercentage = parseInt((optionTwoVotes / totalVotes) * 100);
    const questionAuthor = users[question.author];
    return (
      <div className="question-details-page">
        {isAnsweredByLoggedinUser ? (
          <div className="question-card">
            <article>
              Asked By:{" "}
              {questionAuthor.id === loggedInUser.id
                ? "You"
                : questionAuthor.name}
            </article>
            <main>
              <div className="question-detail">
                <div className="heading">Results for Would You Rather..</div>
                <div className="option">
                  <label htmlFor="optionOne">{optionOne.text} ?</label>
                  <div className="progress">
                    <progress
                      id="OptionOne"
                      value={optionOnePercentage}
                      max="100"
                    ></progress>
                    <span className="votes">
                      {optionOnePercentage}%{" "}
                      <span className="votes-count">
                        ({optionOneVotes} votes)
                      </span>{" "}
                    </span>
                  </div>
                  {isAvailableInChoiceOne && (
                    <span className="your-choice">Your Choice</span>
                  )}
                </div>
                <div className="option">
                  <label htmlFor="optionTwo">{optionTwo.text} ?</label>
                  <div className="progress">
                    <progress
                      id="OptionTwo"
                      value={optionTwoPercentage}
                      max="100"
                    ></progress>
                    <span className="votes">
                      {optionTwoPercentage}%
                      <span className="votes-count">
                        ({optionOneVotes} votes)
                      </span>
                    </span>
                  </div>
                  {isAvailableInChoiceTwo && (
                    <span className="your-choice">Your Choice</span>
                  )}
                </div>
              </div>

              <div className="avatar">
                <img src={questionAuthor.avatarURL} alt="avatar" />
              </div>
            </main>
          </div>
        ) : (
          <div className="question-card">
            <article>
              {questionAuthor.id === loggedInUser.id
                ? "You"
                : questionAuthor.name}{" "}
              asks:
            </article>
            <main>
              <div className="question-detail">
                <div className="game-name">Would You rather... </div>
                <form onSubmit={(e) => this.handleSubmit(e, question.id)}>
                  <input
                    type="radio"
                    name="question"
                    id="optionOne"
                    checked={option === "optionOne"}
                    onChange={() => this.handleOptionSelect("optionOne")}
                  />
                  <label htmlFor="optionOne"> {optionOne.text} ?</label>
                  <br />
                  <input
                    type="radio"
                    name="question"
                    id="optionTwo"
                    checked={option === "optionTwo"}
                    onChange={() => this.handleOptionSelect("optionTwo")}
                  />
                  <label htmlFor="optionTwo"> {optionTwo.text} ?</label>
                  <br />
                  <button type="submit">Submit</button>
                </form>
              </div>

              <div className="avatar">
                <img src={questionAuthor.avatarURL} alt="avatar" />
              </div>
            </main>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const id = match.params.question_id;
  const question = state.questions[id];
  return {
    users: state.users,
    questions: state.questions,
    loggedInUser: state.loggedInUser,
    question,
    id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveQuestionAnswer: (qid, answer) =>
    dispatch(saveQuestionAnswer(qid, answer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
