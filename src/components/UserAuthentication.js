import React, { useState, useEffect } from "react";
import { getJwt } from "../helper/jwt";
import { withRouter } from "react-router-dom";
import Axios from "axios";

function Authentication(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const jwt = getJwt();
    if (!jwt) {
      props.history.push("/");
    }

    Axios.get("http://localhost:4444/posts/loggeddata", {
      headers: { authorization: jwt },
    })
      .then((res) => {
        setUser([res.data]);
        if (res.data.status === 0) {
          props.history.push("/admin/dashboard");
        }
      })
      .catch((error) => {
        localStorage.removeItem("ecom");
        props.history.push("/login");
      });
  }, []);

  return <div>{props.children}</div>;
}

export default withRouter(Authentication);
