import Axios from "axios";
import { GET_PRODUCTS } from "./types";

export const getProducts = () => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/products/selectAll`).then((res) => {
      const response = res.data;
      dispatch({
        type: GET_PRODUCTS,
        payload: response,
      });
    });
  };
};
