import Axios from "axios";
import url from "../../config/config";
import { USER_PRODUCT_CART } from "./types";

export const getUserProductCart = (jwt) => {
  return (dispatch) => {
    Axios.get(`${url}addtocarts/productdetails`, {
      headers: { authorization: jwt },
    }).then((res) => {
      const response = res.data;

      dispatch({
        type: USER_PRODUCT_CART,
        payload: response,
      });
    });
  };
};
