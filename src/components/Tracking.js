import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";

function Tracking() {
  const Products = useSelector(({ product }) => product.data);

  console.log(Products);
  return (
    <div>
      <h1>Tracking</h1>
    </div>
  );
}

export default Header(Tracking);
