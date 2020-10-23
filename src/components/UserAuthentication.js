import React, { useState, useEffect } from "react";
import { getJwt } from "../helper/jwt";
import { withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loggedIn, loginSuccess } from "../redux/actions/registerActions";

function Authentication(props) {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(({ register }) => register.data);

  useEffect(() => {
    const jwt = getJwt();

    if (jwt) {
      dispatch(loggedIn(jwt));
      if (userLoggedIn.status === 0) {
        props.history.push("/admin/dashboard");
      }
    } else {
      props.history.push("/");
    }
  }, []);
  return <div>{props.children}</div>;
}

export default withRouter(Authentication);
