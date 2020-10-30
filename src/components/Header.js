import React, { useEffect } from "react";
import UserNav from "./UserNav";
import { useDispatch, useSelector } from "react-redux";

import { getJwt } from "../helper/jwt";
import { loggedIn, loggedOut } from "../redux/actions/loginActions";

function Header(Childcomponent) {
  return function ResponsiveHeader(props) {
    const dispatch = useDispatch();
    const userLoggedin = useSelector(({ login }) => login.data);

    useEffect(() => {
      const jwt = getJwt();
      if (!jwt) {
        props.history.push("/");
      } else {
        dispatch(loggedIn(jwt));
      }
    }, []);
    useEffect(() => {
      if (userLoggedin && userLoggedin.status === 0) {
        props.history.push("/admin/dashboard");
      }
    }, [userLoggedin]);

    const handleLogout = () => {
      dispatch(loggedOut());
      if (userLoggedin.length === 0) {
        props.history.push("/login");
      }
    };

    return (
      <div className="container-fluid">
        <div className="row mainheader">
          <div className="offset-md-1 col-md-4 col-sm-12">
            <h3 className="headertitile">E-commerce</h3>
          </div>
          <div className="col-md-3 col-sm-12">
            <UserNav />
          </div>

          {userLoggedin !== null && userLoggedin.length !== 0 ? (
            <>
              <div className="col-md-1 col-sm-12 ">
                <a href="/addtocart">
                  <i
                    className="fa fa-shopping-cart addtocarticon"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
              <div className="col-md-3 col-sm-12">
                {userLoggedin.email}
                <button className="btn btn-info " onClick={handleLogout}>
                  logout
                </button>
              </div>
            </>
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
