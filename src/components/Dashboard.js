import React, { useEffect } from "react";

import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import Header from "./Header";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";

function Dashboard(props) {
  const dispatch = useDispatch();
  const isloading = useSelector(({ products }) => products.loading);

  useEffect(() => {
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
