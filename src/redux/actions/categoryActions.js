import Axios from "axios";
import url from "../../config/config";
import { GET_CATEGORY, GET_ALL_CATEGORY } from "./types";

export const getCategory = (id) => {
  return (dispatch) => {
    Axios.get(`${url}categories/select/${id}`).then((res) => {
      const response = res.data;
      dispatch({
        type: GET_CATEGORY,
        payload: response,
      });
    });
  };
};

export const getAllCategory = () => {
  return (dispatch) => {
    Axios.get(`${url}categories/selectall`).then((res) => {
      const response = res.data;
      dispatch({
        type: GET_ALL_CATEGORY,
        payload: response,
      });
    });
  };
};
