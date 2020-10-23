import { combineReducers } from "redux";
import productReducer from "./productReducer";
import registerReducer from "./registerReducer";
import categoryReducer from "./categoryReducer";
import subcategoryReducer from "./subcategoryReducer";

export default combineReducers({
  product: productReducer,
  register: registerReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
});
