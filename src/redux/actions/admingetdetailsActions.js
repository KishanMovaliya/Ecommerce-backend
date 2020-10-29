import Axios from "axios";
import {
  ADMIN_ALL_CATEGORY,
  ADMIN_ALL_PRODUCT,
  ADMIN_ALL_SUB_CATEGORY,
} from "./types";

export const getAdminAllCategory = () => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/categories/selectall`).then((res) => {
      const response = res.data;
      dispatch({
        type: ADMIN_ALL_CATEGORY,
        payload: response,
      });
    });
  };
};

export const getAdminAllSubCategory = () => {
  return (dispatch) => {
    Axios.get("http://localhost:4444/subcategories/selectall").then((res) => {
      const response = res.data;
      dispatch({
        type: ADMIN_ALL_SUB_CATEGORY,
        payload: response,
      });
    });
  };
};

export const getAdminAllProduct = () => {
  return (dispatch) => {
    Axios.get("http://localhost:4444/products/selectAll").then((res) => {
      const response = res.data;
      dispatch({
        type: ADMIN_ALL_PRODUCT,
        payload: response,
      });
    });
  };
};
