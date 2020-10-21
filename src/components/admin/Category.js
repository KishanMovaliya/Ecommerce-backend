import { Button, makeStyles, TextField } from "@material-ui/core"
import Axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react"

import Sidebar from "./Sidebar"


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

function Category(props){
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [updateId, setUpdateId] = useState();
    const [error, setError] = useState([]);

    const selectAllCategories = () => {
      return Axios.get("http://localhost:4444/categories/selectall")
                .then((res) => {
                  setCategories(res.data);
                })
                .catch((err) => {
                    setError(err);    
                });
    }

    useEffect(() => {
      selectAllCategories();
    }, [])

    const handleDelete = (e, id) => {
      e.preventDefault();
      Axios
          .delete(`http://localhost:4444/categories/delete/${id}`)
          .then((res) => {
            alert("Record Deleted Successfully."); 
            selectAllCategories();
          })
          .catch((err) => {
              console.log(err);
          });
    }
    const handleUpdate = (e, id) => {
      e.preventDefault();
      Axios
          .get(`http://localhost:4444/categories/select/${id}`)
          .then((res) => {
            setUpdateId(res.data);
            formik.values.category = res.data.category;
            formik.values._id = res.data._id;
            selectAllCategories();
          })
          .catch((err) => {
              console.log(err);
          });
    }
    const formik = useFormik({
      initialValues: {
        _id:"",
        category: "",
      },
      validate,
      onSubmit: (values) => {

        if(values._id){
          Axios.put(`http://localhost:4444/categories/update/${values._id}`, values)
          .then((res) => {
            setError("updated successfully");
            values.category = "";
            values._id = "";
            selectAllCategories();
          })
          .catch((err) => {
            setError(err.response.data.msg);
          });
        } else {
          Axios.post("http://localhost:4444/categories/create", values)
          .then((res) => {
            selectAllCategories();
            setError("created successfully");
            formik.handleReset();
          })
          .catch((err) => {
            setError(err.response.data.msg);
          });
        }
      },
    });
    

    return (
      <>

        <div className="col-md-4 col-sm-12">
          {error ? <i style={{color:"red"}}>{error}</i> : ""}
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
            {formik.errors.category ? <div>{formik.errors.category}</div> : null}
          </i>
          <br />
          {formik.values._id ? <input type="hidden" value={formik.values._id} name="_id" /> : ""}
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
            {categories.map((category) => 
              <tr key={category._id}>
                <td>{category.category}</td>
                <td> 
                  <button onClick={(e) => handleDelete(e,category._id)}>Delete</button>
                  <button onClick={(e) => handleUpdate(e,category._id)}>Update</button>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </>
    )
}

export default Sidebar(Category)