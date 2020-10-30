import Axios from "axios";
import url from "../../config/config";
import { PRODUCT_DETAILS } from "./types";

export const getSingleProduct = (id) => {
  return (dispatch) => {
    Axios.get(`${url}products/selectproduct/${id}`).then((res) => {
      const response = res.data;
      dispatch({
        type: PRODUCT_DETAILS,
        payload: response,
      });
    });
  };
};
