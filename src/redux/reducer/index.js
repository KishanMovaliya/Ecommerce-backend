import { combineReducers } from "redux";
import productReducer from "./productReducer";
import registerReducer from "./registerReducer";

export default combineReducers({
  product: productReducer,
  register: registerReducer,
});
