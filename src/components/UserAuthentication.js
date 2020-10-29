import React, { useState, useEffect } from "react";
import { getJwt } from "../helper/jwt";
import { withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loggedIn, loginSuccess } from "../redux/actions/loginActions";

function Authentication(props) {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(({ login }) => login.data);

  useEffect(() => {
    const jwt = getJwt();

    if (jwt) {
      dispatch(loggedIn(jwt));
    }
  }, []);

  // useEffect(() => {
  //   if (userLoggedIn.status === 0) {
  //     props.history.push("/admin/dashboard");
  //   } else {
  //     props.history.push("/");
  //   }
  // }, [userLoggedIn]);
  return <div>{props.children}</div>;
}

export default withRouter(Authentication);
