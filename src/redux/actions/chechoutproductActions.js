import Axios from "axios";
import { CHECKOUT_PRODUCT } from "./types";

export const postCheckoutDetails = (checkoutDetails, cartDetails, jwt) => {
  const data = { checkoutDetails, cartDetails };

  return (dispatch) => {
    Axios.post(`http://localhost:4444/productcheckouts/finalcheckout`, data, {
      headers: {
        authorization: jwt,
      },
    }).then((res) => {
      const response = res.data;
      dispatch({
        type: CHECKOUT_PRODUCT,
        payload: response,
      });
    });
  };
};
