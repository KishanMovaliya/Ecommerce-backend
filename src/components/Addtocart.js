import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import url from "../config/config";
import { getJwt } from "../helper/jwt";
import { deleteProductFromUserCart } from "../redux/actions/addtocartActions";
import { getUserProductCart } from "../redux/actions/userproductcartActions";
import Header from "./Header";

import "antd/dist/antd.css";
import { Button, Modal, Input } from "antd";
import { postCheckoutDetails } from "../redux/actions/chechoutproductActions";

function Addtocart(props) {
  const dispatch = useDispatch();
  const cartDetails = useSelector(
    ({ userproductcart }) => userproductcart.data
  );

  const [checkoutDetails, setCheckoutDetails] = useState([
    {
      name: "",
      address: "",
      contact: "",
    },
  ]);
  const [isVisible, setIsVisible] = useState(false);

  const jwt = getJwt();

  useEffect(() => {
    dispatch(getUserProductCart(jwt));
  }, []);

  const handleDeleteAddCart = (e, id) => {
    e.preventDefault();
    dispatch(deleteProductFromUserCart(jwt, id));
    dispatch(getUserProductCart(jwt));
  };

  const handleVisibility = () => {
    setIsVisible(true);
  };
  const handleInVisibility = () => {
    setIsVisible(false);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setCheckoutDetails({ ...checkoutDetails, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    dispatch(postCheckoutDetails(checkoutDetails, cartDetails.data, jwt));
    props.history.push("/tracking");
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
                                  src={`${url}${cartDetail.productId.images}`}
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
              <button
                className="btn btn-dark rounded-pill py-2 btn-block"
                onClick={handleVisibility}
              >
                Procceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={isVisible}
        title="Fill Address Details"
        // onOk={handleVisibility}
        onCancel={handleInVisibility}
        footer={[
          <Button key="back" onClick={handleInVisibility}>
            Cancle
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleCheckoutSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <form>
          <Input
            placeholder="User Name"
            name="name"
            id="name"
            onChange={handleCheckout}
          />
          <Input
            placeholder="Address"
            name="address"
            id="address"
            onChange={handleCheckout}
          />
          <Input
            placeholder="Contact"
            name="contact"
            id="contact"
            onChange={handleCheckout}
          />
        </form>
      </Modal>
    </div>
  );
}

export default Header(Addtocart);
