import * as API from "../utils/_DATA";

const actionTypes = {
  FETCH_USERS_START: "FETCH_USERS_START",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE",

  FETCH_QUESTIONS_START: "FETCH_QUESTIONS_START",
  FETCH_QUESTIONS_SUCCESS: "FETCH_QUESTIONS_SUCCESS",
  FETCH_QUESTIONS_FAILURE: "FETCH_QUESTIONS_FAILURE",

  SET_LOGGED_IN_USER: "SET_LOGGED_IN_USER",
  LOGOUT_USER: "LOGOUT_USER",

  SAVE_NEW_QUESTION_SUCCESS: "SAVE_NEW_QUESTION_SUCCESS",
  SAVE_QUESTION_ANSWER_SUCCESS: "SAVE_QUESTION_ANSWER_SUCCESS",
};

// users
export const fetchUsersStart = () => ({
  type: actionTypes.FETCH_USERS_START,
});

export const fetchUsersSuccess = (users) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = () => ({
  type: actionTypes.FETCH_USERS_FAILURE,
});

// async functions
export const fetchUsers = () => async (dispatch) => {
  console.log("afs");
  dispatch(fetchUsersStart());
  try {
    const users = await API._getUsers();
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    dispatch(fetchUsersFailure());
  }
};

// questions
export const fetchQuestionsStart = () => ({
  type: actionTypes.FETCH_QUESTIONS_START,
});

export const fetchQuestionsSuccess = (questions) => ({
  type: actionTypes.FETCH_QUESTIONS_SUCCESS,
  payload: questions,
});

export const fetchQuestionsFailure = () => ({
  type: actionTypes.FETCH_QUESTIONS_FAILURE,
});

// async functions
export const fetchQuestions = () => async (dispatch) => {
  dispatch(fetchQuestionsStart());
  try {
    const questions = await API._getQuestions();
    dispatch(fetchQuestionsSuccess(questions));
  } catch (error) {
    dispatch(fetchQuestionsFailure());
  }
};

// save Questions
export const saveNewQuestionSuccess = () => ({
  type: "SAVE_NEW_QUESTION_SUCCESS",
});

export const saveNewQuestion = (optionOneText, optionTwoText) => async (
  dispatch,
  getState
) => {
  await API._saveQuestion({
    optionOneText,
    optionTwoText,
    author: getState().loggedInUser.id,
  });

  // could have start and failure as well , but yes I am lazy! :)
  dispatch(saveNewQuestionSuccess());

  // retrieve the state again as quesiton object has changed
  dispatch(fetchQuestions());
};

const saveQuestionAnswerSuccess = () => ({
  type: actionTypes.SAVE_QUESTION_ANSWER_SUCCESS,
});

// change question object in state to include loggedInuser vote in
// question[option].votes.push(loggedInUser.id) if not already exist
// also add/update loggedInUser.answers[question.id] = option
// we have a utility function for this
export const saveQuestionAnswer = (qid, answer) => async (
  dispatch,
  getState
) => {
  const userID = getState().loggedInUser.id;
  await API._saveQuestionAnswer({
    authedUser: userID,
    qid,
    answer,
  });
  dispatch(saveQuestionAnswerSuccess());
  // dispatch to get the modified data.
  dispatch(fetchUsers());
  dispatch(fetchQuestions());
};

// setting logged in user
export const setLoggedInUserSuccess = (user) => ({
  type: actionTypes.SET_LOGGED_IN_USER,
  payload: user,
});

export const setLoggedInUser = (userID) => (dispatch, getState) => {
  const user = getState().users[userID];
  dispatch(setLoggedInUserSuccess(user));
};

export const logoutUser = () => ({
  type: actionTypes.LOGOUT_USER,
});

export default actionTypes;
