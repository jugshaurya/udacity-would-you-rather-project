import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import rootReducer from "./rootReducer";

const middlewares = [loadingBarMiddleware(), thunk, logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
