import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";

import { getJwt } from "../helper/jwt";
import Axios from "axios";

function Header(Childcomponent) {
  return function ResponsiveHeader(props) {
    const [user, setUser] = useState();
    const jwt = getJwt();

    useEffect(() => {
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
        });
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("ecom");
      props.history.push("/login");
    };
    return (
      <div className="container-fluid">
        <div className="row mainheader fixed">
          <div className="offset-md-1 col-md-4 col-sm-12">
            <h3 className="headertitile">E-commerce</h3>
          </div>
          <div className="col-md-4 col-sm-12">
            <UserNav />
          </div>

          {user ? (
            <div className="col-md-3 col-sm-12">
              {user[0].email}

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
