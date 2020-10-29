import { Button, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSubCategory } from "../../redux/actions/admincreatedetailActions";
import { deleteSubCategory } from "../../redux/actions/admindeletedetailActoins";
import {
  getAdminAllCategory,
  getAdminAllSubCategory,
} from "../../redux/actions/admingetdetailsActions";
import { updateSubCategory } from "../../redux/actions/adminupdatedetailActions";

import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const validate = (values) => {
  const errors = {};

  if (!values.category) {
    errors.category = "*";
  }
  if (!values.subcategory) {
    errors.subcategory = "*";
  }
  return errors;
};

function Subcategory() {
  const classes = useStyles();

  const [updateSubcategoryValue, setUpdateSubcategoryValue] = useState(null);
  const [error, setError] = useState([]);

  const subcategories = useSelector(
    ({ admingetdetail }) => admingetdetail.subdata
  );
  const categories = useSelector(({ admingetdetail }) => admingetdetail.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminAllSubCategory());
    dispatch(getAdminAllCategory());
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteSubCategory(id));
  };
  const handleUpdate = (e, subcategory) => {
    e.preventDefault();
    setUpdateSubcategoryValue(subcategory);
  };

  const formik = useFormik({
    initialValues: {
      _id: updateSubcategoryValue ? updateSubcategoryValue._id : "",
      subcategory: updateSubcategoryValue
        ? updateSubcategoryValue.subcategory
        : "",
      category: updateSubcategoryValue ? updateSubcategoryValue.categoryId : "",
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      if (values._id) {
        dispatch(updateSubCategory(values));
      } else {
        dispatch(createSubCategory(values.category, values));
        values.category = "";
        values.subcategory = "";
        values._id = "";
      }
    },
  });

  return (
    <>
      <div className="col-md-4 col-sm-12">
        {error ? <i style={{ color: "red" }}>{error}</i> : ""}
        <form
          method="post"
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          {formik.values._id ? (
            <>
              <input type="hidden" value={formik.values._id} name="_id" />
              <div className="form-group">
                <label htmlFor="category">Category : </label>
                <select
                  className="browser-default custom-select"
                  name="category"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                >
                  <option value={formik.values.category}>
                    {updateSubcategoryValue.categoryId.category}
                  </option>
                </select>
              </div>
            </>
          ) : (
            <div className="form-group">
              <label htmlFor="category">Category : </label>
              <select
                className="browser-default custom-select"
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
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
          )}

          <i style={{ position: "absolute", color: "red" }}>
            {formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </i>
          <br />

          <TextField
            id="standard-basic"
            label="Sub Category"
            name="subcategory"
            type="text"
            style={{ width: `95%` }}
            onChange={formik.handleChange}
            value={formik.values.subcategory}
          />
          <i style={{ position: "absolute", color: "red" }}>
            {formik.errors.subcategory ? (
              <div>{formik.errors.subcategory}</div>
            ) : null}
          </i>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            onClick={formik.handleReset}
            style={{ marginTop: 20 }}
          >
            Cancle
          </Button>
        </form>
      </div>
      <div className="col-md-8 col-sm-12">
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Category</th>
              <th>Sub Category</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {subcategories &&
              subcategories.map((subcategory) => (
                <tr key={subcategory._id}>
                  <td>{subcategory.categoryId.category}</td>

                  <td>{subcategory.subcategory}</td>
                  <td>
                    <button onClick={(e) => handleDelete(e, subcategory._id)}>
                      Delete
                    </button>
                    <button onClick={(e) => handleUpdate(e, subcategory)}>
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

export default Sidebar(Subcategory);
