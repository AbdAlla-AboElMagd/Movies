import { combineReducers } from "redux";
import favReducer from "./FavReducer";

export default combineReducers({
  favMovie: favReducer,
});
