import { createStore } from "redux";
import CombineReducers from "./Reducers/CombineReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const myStore = createStore(CombineReducers, composeWithDevTools());

export default myStore;
