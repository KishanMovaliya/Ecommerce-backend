import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";

import Axios from "axios";
import { getJwt } from "../../helper/jwt";

function Sidebar(Childcomponent) {
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
              {user ? (
              <div className="offset-md-5 col-md-3 col-sm-12">
                {user[0].email.split("@")[0]}

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
           
          </div>
        </div>

        
      </div>
    );
  };
}

export default Sidebar;
