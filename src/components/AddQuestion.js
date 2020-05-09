import React, { Component } from "react";
import * as DATA from "../utils/_DATA";
class AddQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target]: event.target.value });
  };

  render() {
    const { optionOne, optionTwo } = this.state;
    const { questions, loggedInUser, users } = this.props;
    if (!users || !questions) return null;
    return (
      <div className="add-question-page">
        <div className="header">Add New Question </div>
        <div className="body">
          <div>Complete the Question</div>
          <h3>Would You rather...</h3>
          <form
            onSubmit={(e) =>
              this.props.handleQuestionSubmit(e, optionOne, optionTwo)
            }
          >
            <input
              type="text"
              placeholder="option1"
              name="optionOne"
              value={optionOne}
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="option2"
              name="optionTwo"
              value={optionTwo}
              onChange={this.handleChange}
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddQuestion;
