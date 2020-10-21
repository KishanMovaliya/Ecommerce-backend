import React from "react";
import { Link } from "react-router-dom";

function UserNav() {
  return (
    <>
      <div>
        <ul className="list-style-none lineheight10">
          <li className="padding20 lifont">
            <Link to="/" className="color-white">
              Home
            </Link>
          </li>
          <li className="padding20 lifont">
            <Link to="/#" className="color-white">
              Products
            </Link>
          </li>
          <li className="padding20 lifont">
            <Link to="/#" className="color-white">
              Tracking
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserNav;
