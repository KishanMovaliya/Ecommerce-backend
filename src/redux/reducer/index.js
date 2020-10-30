import { combineReducers } from "redux";
import productReducer from "./productReducer";
import registerReducer from "./registerReducer";
import categoryReducer from "./categoryReducer";
import subcategoryReducer from "./subcategoryReducer";
import addtocartReducer from "./addtocartReducer";
import singleproductReducer from "./singleproductReducer";
import loginReducer from "./loginReducer";
import userproductcartReducer from "./userproductcartReducer";
import chechoutproductReducer from "./chechoutproductReducer";
import admingetdetailsReducer from "./admingetdetailsReducer";
import admingetsingledetailReducer from "./admingetsingledetailReducer";
import admincreatedetailReducer from "./admincreatedetailReducer";
import adminupdatedetailReducer from "./adminupdatedetailReducer";
import admindeletedetailReducer from "./admindeletedetailReducer";
import adminuserorderReducer from "./adminuserorderReducer";
import adminorderstatusReducer from "./adminorderstatusReducer";
import userordertrackReducer from "./userordertrackReducer";
import chckouttohistoryReducer from "./checkouttohistoryReducer";

export default combineReducers({
  singleproduct: singleproductReducer,
  products: productReducer,
  register: registerReducer,
  login: loginReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  addtocart: addtocartReducer,
  userproductcart: userproductcartReducer,
  checkoutproduct: chechoutproductReducer,
  admingetdetail: admingetdetailsReducer,
  admingetsingledetail: admingetsingledetailReducer,
  admincreatedetail: admincreatedetailReducer,
  adminupdatedetail: adminupdatedetailReducer,
  admindeletedetail: admindeletedetailReducer,
  adminuserorder: adminuserorderReducer,
  adminorderstatus: adminorderstatusReducer,
  userordertrack: userordertrackReducer,
  chckouttohistory: chckouttohistoryReducer,
});
