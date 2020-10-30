import { Button, makeStyles, TextField } from "@material-ui/core";
import url from "../../config/config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/actions/admincreatedetailActions";
import { deleteProduct } from "../../redux/actions/admindeletedetailActoins";
import {
  getAdminAllCategory,
  getAdminAllProduct,
} from "../../redux/actions/admingetdetailsActions";
import { getSubFromCategory } from "../../redux/actions/admingetsingledetailActions";
import { updateProduct } from "../../redux/actions/adminupdatedetailActions";

import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Product(props) {
  const classes = useStyles();
  // const [showProduct, setShowProduct] = useState([]);
  const showProduct = useSelector(
    ({ admingetdetail }) => admingetdetail.productdata
  );
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [image, setImage] = useState([]);
  const [productDetails, setProductDetails] = useState({
    _id: "",
    categoryId: "",
    subcategoryId: "",
    images: "",
    title: "",
    descriptions: "",
    price: "",
  });
  // const [categories, setCategories] = useState([]);
  const categories = useSelector(({ admingetdetail }) => admingetdetail.data);
  // const [subcategories, setSubCategories] = useState([]);
  const subcategories = useSelector(
    ({ admingetsingledetail }) => admingetsingledetail.data
  );
  const [error, setError] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminAllProduct());
    dispatch(getAdminAllCategory());
  }, []);
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setProductDetails({ ...productDetails, categoryId: e.target.value });
    const id = e.target.value;
    dispatch(getSubFromCategory(id));
  };

  const handleSubChange = (e) => {
    e.preventDefault();
    setProductDetails({ ...productDetails, subcategoryId: e.target.value });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setProductDetails({ ...productDetails, images: e.target.files[0] });
  };
  const handleUpdateFileChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteProduct(id));
  };
  const handleUpdate = (e, product) => {
    e.preventDefault();
    setProductDetails(product);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productDetails._id) {
      const data = new FormData();
      data.append("title", productDetails.title);
      data.append("descriptions", productDetails.descriptions);
      data.append("price", productDetails.price);
      data.append("images", image);

      dispatch(updateProduct(productDetails._id, data));
      handleReset(e);
    } else {
      const data = new FormData();
      data.append("title", productDetails.title);
      data.append("descriptions", productDetails.descriptions);
      data.append("price", productDetails.price);
      data.append("images", productDetails.images);

      dispatch(
        createProduct(
          productDetails.categoryId,
          productDetails.subcategoryId,
          data
        )
      );
      handleReset(e);
    }
  };

  const handleReset = (e) => {
    e.persist();
    setProductDetails({
      _id: "",
      categoryId: "",
      subcategoryId: "",
      images: "",
      title: "",
      descriptions: "",
      price: "",
    });
  };

  return (
    <>
      <div className="col-md-4 col-sm-12">
        {error ? <i style={{ color: "red" }}>{error}</i> : ""}
        <form
          method="post"
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {productDetails && productDetails._id ? (
            <>
              <input type="hidden" name="_id" value={productDetails._id} />
              <div className="form-group">
                <label htmlFor="category">Category : </label>
                <select
                  className="browser-default custom-select"
                  name="category"
                  value={productDetails.categoryId}
                >
                  <option value={productDetails.categoryId}>
                    {productDetails.categoryId.category}
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="category">Sub Category : </label>
                <select
                  className="browser-default custom-select"
                  name="category"
                  value={productDetails.subcategoryId}
                >
                  <option value={productDetails.subcategoryId}>
                    {productDetails.subcategoryId.subcategory}
                  </option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="category">Category : </label>
                <select
                  className="browser-default custom-select"
                  name="category"
                  onChange={handleCategoryChange}
                  value={productDetails.categoryId}
                >
                  <option value="">--Select Category--</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.category}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="category">Sub Category : </label>
                <select
                  className="browser-default custom-select"
                  name="subcategory"
                  onChange={handleSubChange}
                  value={productDetails.subcategoryId}
                >
                  <option value="">--Select Sub Category--</option>
                  {subcategories && subcategories
                    ? subcategories.map((subcategory) => (
                        <option key={subcategory._id} value={subcategory._id}>
                          {subcategory.subcategory}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
            </>
          )}

          {productDetails._id ? (
            <input
              type="file"
              name="images"
              onChange={handleUpdateFileChange}
            />
          ) : (
            <input type="file" name="images" onChange={handleFileChange} />
          )}

          <TextField
            label="title"
            name="title"
            type="text"
            style={{ width: 400 }}
            onChange={handleChange}
            value={productDetails.title}
          />

          <TextField
            label="descriptions"
            name="descriptions"
            type="text"
            style={{ width: 400 }}
            onChange={handleChange}
            value={productDetails.descriptions}
          />

          <TextField
            label="price"
            name="price"
            type="text"
            style={{ width: 400 }}
            onChange={handleChange}
            value={productDetails.price}
          />

          <br />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            {productDetails._id ? "Update" : "Submit"}
          </Button>
          <Button
            variant="contained"
            onClick={handleReset}
            style={{ marginTop: 20 }}
          >
            Cancle
          </Button>
        </form>
      </div>
      <div className="col-md-12 col-sm-12" style={{ marginTop: 50 }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Images</th>
              <th scope="col">Category</th>
              <th scope="col">Subcategory</th>
              <th scope="col">Title</th>
              <th scope="col">Descriptions</th>
              <th scope="col">Price</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {showProduct &&
              showProduct.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={`${url}${product.images}`}
                      alt={product.images}
                      style={{ width: 50, height: 50 }}
                    />
                  </td>
                  <td>{product.categoryId.category}</td>
                  <td>{product.subcategoryId.subcategory}</td>
                  <td width="250px">{product.title}</td>
                  <td width="600px">{product.descriptions}</td>
                  <td>&#x20B9; {product.price}</td>
                  <td>
                    <button
                      className="deletebtn"
                      onClick={(e) => handleDelete(e, product._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="updatebtn"
                      onClick={(e) => handleUpdate(e, product)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Sidebar(Product);
