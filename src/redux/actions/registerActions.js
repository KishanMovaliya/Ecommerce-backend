import Axios from "axios";
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGGED_IN } from "./types";

export const registerSuccess = (values) => {
  return (dispatch) => {
    Axios.post("http://localhost:4444/register/create", values)
      .then((res) => {
        const response = res.data;
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response,
        });
      })
      .catch((err) => {
        throw new Error(err.response.data.msg);
      });
  };
};

export const loginSuccess = (values) => {
  return (dispatch) => {
    Axios.post("http://localhost:4444/login/success", values)
      .then((res) => {
        const response = res.data;
        localStorage.setItem("ecom", res.data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response,
          isLogin: true,
        });
      })
      .catch((err) => {
        dispatch({
          isLogin: false,
        });
        throw new Error(err.response.data.msg);
      });
  };
};

export const loggedIn = (jwt) => {
  console.log(jwt);
  return (dispatch) => {
    Axios.get("http://localhost:4444/posts/loggeddata", {
      headers: { authorization: jwt },
    })
      .then((res) => {
        const response = res.data;
        dispatch({
          type: LOGGED_IN,
          payload: response,
        });
      })
      .catch((err) => {
        localStorage.removeItem("ecom");
        throw new Error(err.response.data.msg);
      });
  };
};
