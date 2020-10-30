import Axios from "axios";
import url from "../../config/config";
import { LOGIN_SUCCESS, LOGGED_IN, LOGGED_OUT, LOGIN_ERROR } from "./types";

export const loginSuccess = (values) => {
  return (dispatch) => {
    Axios.post(`${url}login/success`, values)
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
    Axios.get(`${url}posts/loggeddata`, {
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

export const loggedOut = () => {
  return (dispatch) => {
    try {
      localStorage.removeItem("ecom");
      dispatch({
        type: LOGGED_OUT,
        payload: null,
      });
    } catch (err) {
      throw new Error(err.response.data.msg);
    }
  };
};
