import React from "react";

import { Link } from "react-router-dom";

function AdminNav(props) {
  return (
    <>
      <ul className="list-style">
        <li className="sidebartitle">
          <Link to="/admin/dashboard" className="sidebarheading">
            Admin Dashboard
          </Link>
        </li>
        <li className="sidebartitle">
          <Link to="/admin/category" className="sidebarheading">
            Add Category{" "}
          </Link>
        </li>
        <li className="sidebartitle">
          <Link to="/admin/subcategory" className="sidebarheading">
            Add SubCategory{" "}
          </Link>
        </li>
        <li className="sidebartitle">
          <Link to="/admin/product" className="sidebarheading">
            Add Products
          </Link>
        </li>
        <li className="sidebartitle">
          <Link to="/admin/userorder" className="sidebarheading">
            User Order
          </Link>
        </li>
      </ul>
    </>
  );
}

export default AdminNav;
