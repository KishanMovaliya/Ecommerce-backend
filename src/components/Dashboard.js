import React, { useEffect, useState } from "react";
import { getJwt } from "../helper/jwt";

import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import Header from "./Header";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { loggedIn } from "../redux/actions/registerActions";
import { getUserProductCart } from "../redux/actions/userproductcartActions";

function Dashboard(props) {
  const jwt = getJwt();
  const dispatch = useDispatch();
  const Products = useSelector(({ products }) => products.data);
  const isloading = useSelector(({ products }) => products.loading);

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
      <SwipeableTextMobileStepper />
    </div>
  );
}

export default Header(Dashboard);
