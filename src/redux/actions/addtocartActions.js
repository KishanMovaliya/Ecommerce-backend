import Axios from "axios";
import url from "../../config/config";
import { ADD_TO_CART, DELETE_PRODUCT_FROM_USERCART } from "./types";

export const addtocartProduct = (singleProduct, jwt) => {
  return (dispatch) => {
    Axios.post(
      `${url}addtocarts/add/${singleProduct._id}`,
      {},
      {
        headers: { authorization: jwt },
      }
    ).then((res) => {
      const response = res.data;
      dispatch({
        type: ADD_TO_CART,
        payload: response,
      });
    });
  };
};

export const deleteProductFromUserCart = (jwt, addtocartId) => {
  return (dispatch) => {
    Axios.delete(`${url}addtocarts/deletefromcart/${addtocartId}`, {
      headers: { authorization: jwt },
    }).then((res) => {
      const response = res.data;
    });
  };
};
