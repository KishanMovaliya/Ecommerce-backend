import Axios from "axios";
import { PRODUCT_DETAILS } from "./types";

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
