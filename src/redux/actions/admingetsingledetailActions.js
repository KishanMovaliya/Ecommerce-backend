import Axios from "axios";
import { ADMIN_SINGLE_CATEGORY, ADMIN_SUB_FROM_CATEGORY } from "./types";

export const getSingleCategory = (id) => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/categories/select/${id}`).then((res) => {
      const response = res.data;
      dispatch({
        type: ADMIN_SINGLE_CATEGORY,
        payload: response,
      });
    });
  };
};

export const getSubFromCategory = (id) => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/subcategories/usecategoryid/${id}`).then(
      (res) => {
        const response = res.data;
        dispatch({
          type: ADMIN_SUB_FROM_CATEGORY,
          payload: response,
        });
      }
    );
  };
};
