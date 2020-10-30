import React, { useEffect } from "react";
import { getJwt } from "../helper/jwt";
import { withRouter } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loggedIn } from "../redux/actions/loginActions";

function Authentication(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = getJwt();

    if (jwt) {
      dispatch(loggedIn(jwt));
    }
  }, []);

  return <div>{props.children}</div>;
}

export default withRouter(Authentication);
