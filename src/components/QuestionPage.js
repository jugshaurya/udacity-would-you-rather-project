import React, { Component } from "react";
class QuestionPage extends Component {
  state = {
    option: "optionOne",
  };

  handleOptionSelect = (option) => this.setState({ option });

  handleSubmit = (event, question) => {
    this.props.handleChoiceSubmit(event, question, this.state.option);
  };

  render() {
    const { users, questions, loggedInUser } = this.props;
    if (!users || !questions) return null;
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
    const oneVotes = question.optionOne.votes.length;
    const twoVotes = question.optionTwo.votes.length;
    const totalVotes = oneVotes + twoVotes;
    const optionOnePercentage = parseInt((oneVotes / totalVotes) * 100);
    const optionTwoPercentage = parseInt((twoVotes / totalVotes) * 100);
    return (
      <div className="question-details-page">
        {isAnsweredByLoggedinUser ? (
          <div className="question">
            <article>Asked By: {users[question.author].name} </article>
            <main>
              <div className="avatar">
                <img src={users[question.author].avatarURL} alt="avatar" />
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
                <span>{`${oneVotes}/${totalVotes}`}</span>
                <br />
                <label htmlFor="optionTwo">{question.optionTwo.text}?</label>
                <progress
                  id="OptionTwo"
                  value={optionTwoPercentage}
                  max="100"
                ></progress>
                {isAvailableInChoiceTwo && <span>You choose this!</span>}
                <span>{`${twoVotes}/${totalVotes}`}</span>
              </div>
            </main>
          </div>
        ) : (
          <div className="question">
            <article>{users[question.author].name} asks: </article>
            <main>
              <div className="avatar">
                <img src={users[question.author].avatarURL} alt="avatar" />
              </div>
              <div className="question-detail">
                <div className="heading">Choose: Would You rather... </div>
                <form onSubmit={(e) => this.handleSubmit(e, question)}>
                  <input
                    type="radio"
                    name="question"
                    id="optionOne"
                    checked={this.state.option}
                    onChange={() => this.handleOptionSelect("optionOne")}
                  />
                  <label htmlFor="optionOne"> {question.optionOne.text}?</label>
                  <br />
                  <input
                    type="radio"
                    name="question"
                    id="optionTwo"
                    checked={this.state.option}
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

export default QuestionPage;
