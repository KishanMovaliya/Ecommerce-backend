import Axios from "axios";
import url from "../../config/config";
import { REGISTER_SUCCESS } from "./types";

export const registerSuccess = (values) => {
  return (dispatch) => {
    Axios.post(`${url}register/create`, values)
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
