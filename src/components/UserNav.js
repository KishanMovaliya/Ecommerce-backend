import React from "react";
import { Link } from "react-router-dom";

function UserNav() {
  return (
    <>
      <div>
        <ul className="list-style-none lineheight10">
          <li className="padding20 lifont">
            <Link to="/" className="color-darkslategray">
              Home
            </Link>
          </li>
          <li className="padding20 lifont">
            <Link to="/allproduct" className="color-darkslategray">
              Products
            </Link>
          </li>
          <li className="padding20 lifont">
            <Link to="/#" className="color-darkslategray">
              Tracking
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserNav;
