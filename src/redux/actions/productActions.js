import Axios from "axios";
import { GET_PRODUCTS, PRODUCT_DETAILS } from "./types";

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

export const getSingleProduct = (id) => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/products/selectproduct/${id}`).then(
      (res) => {
        const response = res.data;
        dispatch({
          type: PRODUCT_DETAILS,
          payload: response,
        });
      }
    );
  };
};
