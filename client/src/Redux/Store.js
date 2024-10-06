import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./userReducer"; // path to userReducer

const rootReducer = combineReducers({
  user: userReducer, // Make sure 'user' matches what you're using in useSelector
});

const store = createStore(rootReducer);

export default store;
