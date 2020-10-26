import Axios from "axios";
import { GET_SUBCATEGORY, GET_ALL_SUBCATEGORY } from "./types";

export const getSubCategory = (id) => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/subcategories/select/${id}`).then(
      (res) => {
        const response = res.data;
        dispatch({
          type: GET_SUBCATEGORY,
          payload: response,
        });
      }
    );
  };
};

export const getAllSubCategory = () => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/subcategories/selectall`).then((res) => {
      const response = res.data;
      dispatch({
        type: GET_ALL_SUBCATEGORY,
        payload: response,
      });
    });
  };
};
