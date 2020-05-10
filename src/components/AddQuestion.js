import React, { Component } from "react";
import { connect } from "react-redux";
import { saveNewQuestion } from "../redux/actions";
class AddQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    if (optionOneText.trim().length < 1 || optionTwoText.trim().length < 1)
      return;
    this.props.saveNewQuestion(optionOneText, optionTwoText);
    this.props.history.push("/");
  };

  render() {
    const { optionOneText, optionTwoText } = this.state;
    return (
      <div className="add-question-page">
        <div className="new-card">
          <article>Add New Question </article>
          <h3>Would You rather...</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="option1">Option 1</label>
            <input
              id="option1"
              type="text"
              placeholder="option1"
              name="optionOneText"
              value={optionOneText}
              onChange={this.handleChange}
            />
            <label htmlFor="option2">Option 2</label>
            <input
              id="option2"
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
