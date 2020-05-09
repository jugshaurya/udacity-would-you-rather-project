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
    const { users, questions, loggedInUser } = this.props;
    const id = this.props.match.params.question_id;
    const question = questions[id];
    const isAvailableInChoiceOne = question.optionOne.votes.includes(
      loggedInUser.id
    );
    const isAvailableInChoiceTwo = question.optionTwo.votes.includes(
      loggedInUser.id
    );
    const isAnsweredByLoggedinUser =
      isAvailableInChoiceOne || isAvailableInChoiceTwo;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePercentage = parseInt((optionOneVotes / totalVotes) * 100);
    const optionTwoPercentage = parseInt((optionTwoVotes / totalVotes) * 100);
    const questionAuthor = users[question.author];

    return (
      <div className="question-details-page">
        {isAnsweredByLoggedinUser ? (
          <div className="question">
            <article>Asked By: {questionAuthor.name} </article>
            <main>
              <div className="avatar">
                <img src={questionAuthor.avatarURL} alt="avatar" />
              </div>
              <div className="question-detail">
                <div className="heading">Results: </div>
                <label htmlFor="optionOne">{question.optionOne.text}? </label>
                <progress
                  id="OptionOne"
                  value={optionOnePercentage}
                  max="100"
                ></progress>
                {isAvailableInChoiceOne && <span>You choose this!</span>}
                <span>{`${optionOneVotes}/${totalVotes}`}</span>
                <br />
                <label htmlFor="optionTwo">{question.optionTwo.text}?</label>
                <progress
                  id="OptionTwo"
                  value={optionTwoPercentage}
                  max="100"
                ></progress>
                {isAvailableInChoiceTwo && <span>You choose this!</span>}
                <span>{`${optionTwoVotes}/${totalVotes}`}</span>
              </div>
            </main>
          </div>
        ) : (
          <div className="question">
            <article>{questionAuthor.name} asks: </article>
            <main>
              <div className="avatar">
                <img src={questionAuthor.avatarURL} alt="avatar" />
              </div>
              <div className="question-detail">
                <div className="heading">Choose: Would You rather... </div>
                <form onSubmit={(e) => this.handleSubmit(e, question.id)}>
                  <input
                    type="radio"
                    name="question"
                    id="optionOne"
                    checked={option}
                    onChange={() => this.handleOptionSelect("optionOne")}
                  />
                  <label htmlFor="optionOne"> {question.optionOne.text}?</label>
                  <br />
                  <input
                    type="radio"
                    name="question"
                    id="optionTwo"
                    checked={option}
                    onChange={() => this.handleOptionSelect("optionTwo")}
                  />
                  <label htmlFor="optionTwo"> {question.optionTwo.text}?</label>
                  <br />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </main>
          </div>
        )}
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
  saveQuestionAnswer: (qid, answer) =>
    dispatch(saveQuestionAnswer(qid, answer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
