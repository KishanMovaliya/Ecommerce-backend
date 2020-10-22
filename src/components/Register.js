import { Button, makeStyles, TextField } from "@material-ui/core";
import Axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { registerSuccess } from "../redux/actions/registerActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or more";
  }

  return errors;
};

function Register(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const register = useSelector(({ register }) => register.data);

  const [error, setError] = useState([]);

  const handleCancle = (e) => {
    e.preventDefault();
    props.history.push("/");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      status: 1,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerSuccess(values));
      if (register != []) {
        props.history.push("/login");
      }
    },
  });
  console.log("register", register);
  return (
    <div className="register-box" align="center">
      <div className="header-register">
        <h3>Register Your Details</h3>
      </div>
      <div>
        <i style={{ color: "red" }}>{error ? error : null}</i>
      </div>
      <div>
        <form
          method="post"
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="standard-basic"
            label="Email"
            name="email"
            type="text"
            style={{ width: 400 }}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <i style={{ position: "absolute", color: "red" }}>
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </i>
          <br />
          <TextField
            id="standard-basic"
            label="********"
            name="password"
            type="password"
            style={{ width: 400 }}
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          <i style={{ position: "absolute", color: "red" }}>
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </i>
          <br />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Register
          </Button>
          <Button
            variant="contained"
            onClick={handleCancle}
            style={{ marginTop: 20 }}
          >
            Cancle
          </Button>
        </form>
      </div>
      <div>
        <i>
          You have already reagistered, then
          <Link to="/login">
            <b> Login</b>
          </Link>
        </i>
      </div>
    </div>
  );
}

export default Register;
