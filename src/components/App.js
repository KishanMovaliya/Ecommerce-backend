import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./Dashboard";
import Register from "./Register";
import Login from "./Login";
import UserAuthentication from "./UserAuthentication";
import AllProduct from "./AllProduct";

import AdminDashboard from "./admin/Dashboard";
import Category from "./admin/Category";
import Subcategory from "./admin/Subcategory";
import Product from "./admin/Product";
import Tracking from "./Tracking";

import { Provider } from "react-redux";
import store from "../redux/store";
import ProductDetails from "./ProductDetails";
import Addtocart from "./Addtocart";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Dashboard} />
          <UserAuthentication>
            <Route path="/admin/dashboard" component={AdminDashboard} />
            <Route path="/admin/category" component={Category} />
            <Route path="/admin/subcategory" component={Subcategory} />
            <Route path="/admin/product" component={Product} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/allproduct" component={AllProduct} />
            <Route
              path="/productdetails/:productId"
              component={ProductDetails}
            />
            <Route path="/addtocart" component={Addtocart} />
            <Route path="/tracking" component={Tracking} />
          </UserAuthentication>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
