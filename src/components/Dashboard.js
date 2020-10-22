import React, { useEffect, useState } from "react";
import { getJwt } from "../helper/jwt";

import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import Header from "./Header";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { loggedIn } from "../redux/actions/registerActions";

function Dashboard(props) {
  const jwt = getJwt();
  const dispatch = useDispatch();
  const Products = useSelector(({ product }) => product.data);
  const isloading = useSelector(({ product }) => product.loading);

  // const userLoggedIn = useSelector(({ register }) => register.data);
  // const deplay = (ms) =>
  //   new Promise((reslove, reject) => setTimeout(() => reslove(), ms));

  useEffect(() => {
    // await deplay(2000);
    dispatch(getProducts());
  }, []);

  if (isloading) {
    return <div>loading....</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <SwipeableTextMobileStepper />
    </div>
  );
}

export default Header(Dashboard);
