import { DragHandle } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJwt } from "../helper/jwt";
import { deleteProductFromUserCart } from "../redux/actions/addtocartActions";
import { getAllCategory } from "../redux/actions/categoryActions";
import { getAllSubCategory } from "../redux/actions/subcategoryActions";
import { getUserProductCart } from "../redux/actions/userproductcartActions";
import Header from "./Header";

function Addtocart() {
  const dispatch = useDispatch();
  const cartDetails = useSelector(
    ({ userproductcart }) => userproductcart.data
  );
  const jwt = getJwt();

  useEffect(() => {
    dispatch(getUserProductCart(jwt));
  }, []);

  const handleDeleteAddCart = (e, id) => {
    e.preventDefault();
    dispatch(deleteProductFromUserCart(jwt, id));
    dispatch(getUserProductCart(jwt));
  };

  return (
    <div className="px-4 px-lg-0">
      <div className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">Product</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Price</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Quantity</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Remove</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails !== null
                      ? cartDetails.data.map((cartDetail) => (
                          <tr key={cartDetail._id}>
                            <th scope="row" className="border-0">
                              <div className="p-2">
                                <img
                                  src={`http://localhost:4444/${cartDetail.productId.images}`}
                                  alt=""
                                  width="70"
                                  height="70"
                                  className="img-fluid rounded shadow-sm"
                                />
                                <div className="ml-3 d-inline-block align-middle">
                                  <h5 className="mb-0">
                                    {" "}
                                    <a
                                      href="#"
                                      className="text-dark d-inline-block align-middle"
                                    >
                                      {cartDetail.productId.title}
                                    </a>
                                  </h5>
                                  <span className="text-muted font-weight-normal font-italic d-block">
                                    Category:{" "}
                                    {cartDetail.productId.categoryId.category}
                                    &nbsp;&nbsp;&nbsp;&nbsp; Sub-Category:{" "}
                                    {
                                      cartDetail.productId.subcategoryId
                                        .subcategory
                                    }
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className="border-0 align-middle">
                              <strong>
                                &#x20B9; {cartDetail.productId.price}
                              </strong>
                            </td>
                            <td className="border-0 align-middle">
                              <div className="qtyboxborder">
                                <strong className="qtybox qtyaction">-</strong>
                                <strong className="qtybox">
                                  {cartDetail.qty}
                                </strong>
                                <strong
                                  className="qtybox qtyaction"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    console.log(cartDetail.qty);
                                  }}
                                >
                                  +
                                </strong>
                              </div>
                            </td>
                            <td className="border-0 align-middle">
                              <a
                                href="#"
                                className="text-dark"
                                onClick={(e) =>
                                  handleDeleteAddCart(e, cartDetail._id)
                                }
                              >
                                <i className="fa fa-trash"></i>
                              </a>
                            </td>
                          </tr>
                        ))
                      : "Add product on your cart list"}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row py-5 p-4 bg-white rounded shadow-sm">
            <div className="col-lg-6 offset-md-3">
              <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                Order summary{" "}
              </div>
              <div className="p-4">
                <p className="font-italic mb-4">
                  Shipping and additional costs are calculated based on values
                  you have entered.
                </p>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between py-3 border-bottom">
                    <strong className="text-muted">Order Subtotal </strong>
                    <strong>$390.00</strong>
                  </li>
                  <li className="d-flex justify-content-between py-3 border-bottom">
                    <strong className="text-muted">
                      Shipping and handling
                    </strong>
                    <strong>$10.00</strong>
                  </li>
                  <li className="d-flex justify-content-between py-3 border-bottom">
                    <strong className="text-muted">Tax</strong>
                    <strong>$0.00</strong>
                  </li>
                  <li className="d-flex justify-content-between py-3 border-bottom">
                    <strong className="text-muted">Total</strong>
                    <h5 className="font-weight-bold">$400.00</h5>
                  </li>
                </ul>
                <a
                  href="#"
                  className="btn btn-dark rounded-pill py-2 btn-block"
                >
                  Procceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header(Addtocart);
