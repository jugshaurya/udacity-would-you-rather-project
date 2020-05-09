import { combineReducers } from "redux";
import { usersReducer, questionsReducer, loggedInUserReducer } from "./reducer";

const rootReducer = combineReducers({
  users: usersReducer,
  questions: questionsReducer,
  loggedInUser: loggedInUserReducer,
});

export default rootReducer;
