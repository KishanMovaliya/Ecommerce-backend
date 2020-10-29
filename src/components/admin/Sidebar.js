import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";

import Axios from "axios";
import { getJwt } from "../../helper/jwt";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, loggedOut } from "../../redux/actions/loginActions";

function Sidebar(Childcomponent) {
  return function ResponsiveHeader(props) {
    const user = useSelector(({ login }) => login.data);
    const [token, setToken] = useState(getJwt());
    const dispatch = useDispatch();

    const jwt = getJwt();

    useEffect(() => {
      if (!jwt) {
        props.history.push("/");
      } else {
        dispatch(loggedIn(jwt));
      }
    }, []);
    useEffect(() => {
      if (user === null) {
        props.history.push("/login");
      }
    }, [user]);

    const handleLogout = () => {
      dispatch(loggedOut());
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 admin-sidebar">
            <div className="col-sm-12">
              <h3 className="">E-commerce</h3>
            </div>
            <div className=" col-sm-12">
              <AdminNav />
            </div>
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                {token ? (
                  <div className="offset-md-5 col-md-3 col-sm-12">
                    {user && user.email}

                    <button className="btn btn-info " onClick={handleLogout}>
                      logout
                    </button>
                  </div>
                ) : (
                  " "
                )}
              </div>
              <Childcomponent {...props} />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Sidebar;
