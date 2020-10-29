import { Button, makeStyles, TextField } from "@material-ui/core";
import Axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../redux/actions/admincreatedetailActions";
import { deleteCategory } from "../../redux/actions/admindeletedetailActoins";
import { getAdminAllCategory } from "../../redux/actions/admingetdetailsActions";
import { getSingleCategory } from "../../redux/actions/admingetsingledetailActions";
import { updateCategory } from "../../redux/actions/adminupdatedetailActions";

import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const validate = (values) => {
  const errors = {};

  if (!values.category) {
    errors.category = "Required";
  }
  return errors;
};

function Category(props) {
  const classes = useStyles();
  const [error, setError] = useState([]);
  const [updateCategoryValue, setUpdateCategoryValue] = useState(null);

  const dispatch = useDispatch();
  const categories = useSelector(({ admingetdetail }) => admingetdetail.data);

  useEffect(() => {
    dispatch(getAdminAllCategory());
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteCategory(id));
  };

  const handleUpdate = (e, category) => {
    e.preventDefault();
    setUpdateCategoryValue(category);
  };

  const formik = useFormik({
    initialValues: {
      _id: updateCategoryValue ? updateCategoryValue._id : "",
      category: updateCategoryValue ? updateCategoryValue.category : "",
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      if (values._id) {
        dispatch(updateCategory(values));
        values._id = "";
        values.category = "";
      } else {
        dispatch(createCategory(values));
        values._id = "";
        values.category = "";
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
          <TextField
            id="standard-basic"
            label="Category"
            name="category"
            type="text"
            style={{ width: 400 }}
            onChange={formik.handleChange}
            value={formik.values.category}
          />

          <i style={{ position: "absolute", color: "red" }}>
            {formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </i>
          <br />
          {formik.values._id ? (
            <input type="hidden" value={formik.values._id} name="_id" />
          ) : (
            ""
          )}
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
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.category}</td>
                  <td>
                    <button onClick={(e) => handleDelete(e, category._id)}>
                      Delete
                    </button>
                    <button onClick={(e) => handleUpdate(e, category)}>
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

export default Sidebar(Category);
