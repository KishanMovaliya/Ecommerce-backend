import { combineReducers } from "redux";
import productReducer from "./productReducer";
import registerReducer from "./registerReducer";
import categoryReducer from "./categoryReducer";
import subcategoryReducer from "./subcategoryReducer";
import addtocartReducer from "./addtocartReducer";
import singleproductReducer from "./singleproductReducer";
import loginReducer from "./loginReducer";
import userproductcartReducer from "./userproductcartReducer";

export default combineReducers({
  singleproduct: singleproductReducer,
  products: productReducer,
  register: registerReducer,
  login: loginReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  addtocart: addtocartReducer,
  userproductcart: userproductcartReducer,
});
