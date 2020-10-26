import Axios from "axios";
import { USER_PRODUCT_CART } from "./types";

export const getUserProductCart = (jwt) => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/addtocarts/productdetails`, {
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
