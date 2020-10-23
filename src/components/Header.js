import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import { useDispatch, useSelector } from "react-redux";

import { getJwt } from "../helper/jwt";
import Axios from "axios";
import { loggedIn } from "../redux/actions/registerActions";

function Header(Childcomponent) {
  return function ResponsiveHeader(props) {
    const dispatch = useDispatch();
    const userLoggedin = useSelector(({ register }) => register.data);

    useEffect(() => {
      const jwt = getJwt();
      if (!jwt) {
        props.history.push("/");
      } else {
        dispatch(loggedIn(jwt));
        if (userLoggedin.status === 0) {
          props.history.push("/admin/dashboard");
        }
      }
    }, [userLoggedin]);
    const handleLogout = () => {
      localStorage.removeItem("ecom");
      props.history.push("/login");
    };
    return (
      <div className="container-fluid">
        <div className="row mainheader">
          <div className="offset-md-1 col-md-4 col-sm-12">
            <h3 className="headertitile">E-commerce</h3>
          </div>
          <div className="col-md-4 col-sm-12">
            <UserNav />
          </div>

          {userLoggedin._id ? (
            <div className="col-md-3 col-sm-12">
              {userLoggedin.email}
              <button className="btn btn-info " onClick={handleLogout}>
                logout
              </button>
            </div>
          ) : (
            <div className="col-md-3 col-sm-12">
              <button
                className="btn btn-primary   "
                onClick={() => {
                  props.history.push("/login");
                }}
              >
                Login
              </button>
              <button
                className="btn btn-info "
                onClick={() => {
                  props.history.push("/register");
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>

        <Childcomponent {...props} />
      </div>
    );
  };
}

export default Header;
