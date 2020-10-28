import { Button, makeStyles, TextField } from "@material-ui/core";
import Axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

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

function Subcategory(props) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [error, setError] = useState([]);

  const selectAllSubCategories = () => {
    return Axios.get("http://localhost:4444/subcategories/selectall")
      .then((res) => {
        setSubCategories(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    selectAllSubCategories();

    Axios.get("http://localhost:4444/categories/selectall")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        if (err.response.data.status === 400) {
          setError(err.response.data.msg);
        }
      });
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    Axios.delete(`http://localhost:4444/subcategories/delete/${id}`)
      .then((res) => {
        alert("Record Deleted Successfully.");
        selectAllSubCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = (e, id) => {
    e.preventDefault();
    Axios.get(`http://localhost:4444/subcategories/select/${id}`)
      .then((res) => {
        formik.values.category = res.data.categoryId;
        formik.values.subcategory = res.data.subcategory;
        formik.values._id = res.data._id;

        selectAllSubCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      _id: "",
      subcategory: "",
      category: "",
    },
    validate,
    onSubmit: (values) => {
      if (values._id) {
        Axios.put(
          `http://localhost:4444/subcategories/update/${values._id}`,
          values
        )
          .then((res) => {
            setError("Updated Successfully");
            values.category = "";
            values.subcategory = "";
            values._id = "";
            selectAllSubCategories();
          })
          .catch((err) => {
            if (err.response.status === 400) {
              setError(err.response.data.msg);
            }
          });
      } else {
        Axios.post(
          `http://localhost:4444/subcategories/create/${values.category}`,
          values
        )
          .then((res) => {
            setError("Created Successfully");
            values.subcategory = "";
            values.category = "";
            selectAllSubCategories();
          })
          .catch((err) => {
            if (err.response.status === 400) {
              setError(err.response.data.msg);
            }
          });
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
                  {categories.map((category) => {
                    if (category._id === formik.values.category) {
                      return (
                        <option
                          key={category._id}
                          value={formik.values.category}
                        >
                          {category.category}
                        </option>
                      );
                    }
                  })}
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
                {categories.map((category) => (
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
            {subcategories.map((subcategory) => (
              <tr key={subcategory._id}>
                {categories.map((category) => {
                  if (category._id === subcategory.categoryId) {
                    return <td key={category._id}>{category.category}</td>;
                  }
                })}

                <td>{subcategory.subcategory}</td>
                <td>
                  <button onClick={(e) => handleDelete(e, subcategory._id)}>
                    Delete
                  </button>
                  <button onClick={(e) => handleUpdate(e, subcategory._id)}>
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
