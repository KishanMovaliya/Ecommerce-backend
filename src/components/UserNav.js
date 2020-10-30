import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserNav() {
  const userLoggedin = useSelector(({ login }) => login.data);

  return (
    <>
      <div>
        <ul className="list-style-none lineheight10">
          <li className="padding20 lifont">
            <Link to="/dashboard" className="color-darkslategray">
              Home
            </Link>
          </li>
          <li className="padding20 lifont">
            <Link to="/allproduct" className="color-darkslategray">
              Products
            </Link>
          </li>
          {userLoggedin &&
          userLoggedin !== null &&
          userLoggedin.length !== 0 ? (
            <li className="padding20 lifont">
              <Link to="/tracking" className="color-darkslategray">
                Tracking
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
}

export default UserNav;
