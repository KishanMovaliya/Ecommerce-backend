import Axios from "axios";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGGED_IN,
  LOGIN_ERROR,
} from "./types";

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
        if (res.data.status === 400) {
          dispatch({
            type: LOGIN_ERROR,
            payload: response,
            isLogin: false,
          });
        } else {
          localStorage.setItem("ecom", res.data);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response,
            isLogin: true,
          });
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.msg);
      });
  };
};

export const loggedIn = (jwt) => {
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
        throw new Error(err.response.data.msg);
      });
  };
};
