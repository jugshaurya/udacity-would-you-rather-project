import actionTypes from "./actions";
export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_SUCCESS:
      return { ...state, ...action.payload };
    case actionTypes.FETCH_USERS_FAILURE:
    case actionTypes.FETCH_USERS_START:
    default:
      return state;
  }
};

export const questionsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QUESTIONS_SUCCESS:
      return { ...state, ...action.payload };
    case actionTypes.FETCH_QUESTIONS_FAILURE:
    case actionTypes.FETCH_QUESTIONS_START:
    case actionTypes.SAVE_NEW_QUESTION_SUCCESS:
    default:
      return state;
  }
};

export const loggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGGED_IN_USER:
      return { ...state, ...action.payload };
    case actionTypes.LOGOUT_USER:
      return {};
    default:
      return state;
  }
};
