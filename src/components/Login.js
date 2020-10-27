import { Button, makeStyles, TextField } from "@material-ui/core";
import Axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/actions/loginActions";

import { Link } from "react-router-dom";

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

function Login(props) {
  const classes = useStyles();

  const [error, setError] = useState([]);

  const dispatch = useDispatch();
  const userSuccess = useSelector(({ login }) => login.data);

  useEffect(() => {
    if (userSuccess === null || userSuccess.length === 0) {
      // props.history.push("/login");
    } else if (userSuccess.status !== "") {
      if (userSuccess.status === 400) {
        setError(userSuccess.msg);
      } else {
        props.history.push("/dashboard");
      }
    } else {
      props.history.push("/login");
    }
  }, [userSuccess]);

  const handleCancle = (e) => {
    e.preventDefault();
    props.history.push("/dashboard");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(loginSuccess(values));
    },
  });
  return (
    <div className="register-box" align="center">
      <div className="header-register">
        <h3>Login</h3>
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

          <input type="hidden" name="status" value={1} id="status" />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Login
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
          You have not reagistered, then{" "}
          <Link to="/register">
            <b>Register</b>
          </Link>
        </i>
      </div>
    </div>
  );
}

export default Login;
