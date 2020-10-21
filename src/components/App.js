import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./Dashboard";
import Register from "./Register";
import Login from "./Login";
import AdminDashboard from "./admin/Dashboard";
import UserAuthentication from "./UserAuthentication";
import Category from "./admin/Category";
import Subcategory from "./admin/Subcategory";
import Product from "./admin/Product";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <UserAuthentication>
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/category" component={Category} />
          <Route path="/admin/subcategory" component={Subcategory} />
          <Route path="/admin/product" component={Product} />
          <Route path="/dashboard" component={Dashboard} />
        </UserAuthentication>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
