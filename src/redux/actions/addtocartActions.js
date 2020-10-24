import Axios from "axios";
import { ADD_TO_CART } from "./types";

export const addtocartProduct = (singleProduct, jwt) => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/addtocarts/add/${singleProduct._id}`, {
      headers: { authorization: jwt },
    }).then((res) => {
      const response = res.data;
      dispatch({
        type: ADD_TO_CART,
        payload: response,
      });
    });
  };
};
