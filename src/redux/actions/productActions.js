import Axios from "axios";
import url from "../../config/config";
import { GET_PRODUCTS } from "./types";

export const getProducts = () => {
  return (dispatch) => {
    Axios.get(`${url}products/selectAll`).then((res) => {
      const response = res.data;
      dispatch({
        type: GET_PRODUCTS,
        payload: response,
      });
    });
  };
};
