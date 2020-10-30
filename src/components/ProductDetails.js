import React, { useEffect } from "react";

import Header from "./Header";
import url from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/actions/singleproductActions";
import { getCategory } from "../redux/actions/categoryActions";
import { getSubCategory } from "../redux/actions/subcategoryActions";
import { getJwt } from "../helper/jwt";
import { addtocartProduct } from "../redux/actions/addtocartActions";
import { getUserProductCart } from "../redux/actions/userproductcartActions";

function ProductDetails(props) {
  const productId = props.match.params.productId;

  const jwt = getJwt();

  const dispatch = useDispatch();
  const singleProduct = useSelector(({ singleproduct }) => singleproduct.data);
  const singleCategory = useSelector(({ category }) => category.data);
  const singleSubCategory = useSelector(({ subcategory }) => subcategory.data);
  const isloading = useSelector(({ singleproduct }) => singleproduct.loading);

  const addtocart = useSelector(({ addtocart }) => addtocart.data);

  // const deplay = (ms) =>
  //   new Promise((reslove, reject) => setTimeout(() => reslove(), ms));

  useEffect(() => {
    // deplay(2000);
    dispatch(getSingleProduct(productId));
  }, []);
  useEffect(() => {
    if (singleProduct) {
      dispatch(getCategory(singleProduct.categoryId));
      dispatch(getSubCategory(singleProduct.subcategoryId));
    }
  }, [singleProduct]);
  const handleAddToCart = (e, singleProduct) => {
    e.preventDefault();
    dispatch(addtocartProduct(singleProduct, jwt));
    dispatch(getUserProductCart(jwt));
    if (addtocart !== null) {
      props.history.push(`/addtocart`);
    }
  };

  if (isloading) {
    return <div>loading....</div>;
  }
  return (
    <>
      <div className="container">
        <div className="row productbody">
          <div className="col-md-4 col-lg-4 col-12 mp0">
            <img
              src={`${url}${singleProduct.images}`}
              height="500px"
              width="100%"
              className="borderradius5"
            />
          </div>
          <div className="col-md-8 col-lg-8 col-12 mp0 detailscomponent">
            <div className="row">
              <div className="col-md-12 col-lg-12 col-12">
                <span>{singleCategory && singleCategory.category}</span> &nbsp;
                <span>
                  {singleSubCategory && singleSubCategory.subcategory}
                </span>
              </div>
              <div className="col-md-12 col-lg-12 col-12">
                <span>
                  <h2>{singleProduct && singleProduct.title}</h2>
                  <p>{singleProduct && singleProduct.descriptions}</p>
                </span>
              </div>
              <div className="col-md-12 col-lg-12 col-12">
                <span>
                  <h1>
                    <b>&#x20B9; {singleProduct && singleProduct.price}</b>
                  </h1>
                </span>
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-4 offset-md-2 col-lg-4 col-12 p0 mtb20"
                style={{ marginRight: 3 }}
              >
                <button
                  className="btnaddtocart"
                  onClick={(e) => handleAddToCart(e, singleProduct)}
                >
                  ADD TO CART
                </button>
              </div>
              <div
                className="col-md-4 col-lg-4 col-12 p0 mtb20"
                style={{ marginLeft: 3 }}
              >
                <button className="btnwishlist">WISHLIST</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header(ProductDetails);
