import React, { Component } from "react";
import { connect } from "react-redux";
import { saveNewQuestion } from "../redux/actions";
class AddQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    this.props.saveNewQuestion(optionOneText, optionTwoText);
  };

  render() {
    const { optionOneText, optionTwoText } = this.state;
    return (
      <div className="add-question-page">
        <div className="header">Add New Question </div>
        <div className="body">
          <div>Complete the Question</div>
          <h3>Would You rather...</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="option1"
              name="optionOneText"
              value={optionOneText}
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="option2"
              name="optionTwoText"
              value={optionTwoText}
              onChange={this.handleChange}
            />
            <button>Submit</button>
          </form>
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
  saveNewQuestion: (optionOneText, optionTwoText) =>
    dispatch(saveNewQuestion(optionOneText, optionTwoText)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
