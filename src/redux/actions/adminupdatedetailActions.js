import Axios from "axios";
import {
  getAdminAllCategory,
  getAdminAllProduct,
  getAdminAllSubCategory,
} from "./admingetdetailsActions";
import { ADMIN_UPDATE_CATEGORY } from "./types";

export const updateCategory = (values) => {
  return (dispatch) => {
    Axios.put(
      `http://localhost:4444/categories/update/${values._id}`,
      values
    ).then((res) => {
      const response = res.data;
      dispatch(getAdminAllCategory());
    });
  };
};

export const updateSubCategory = (values) => {
  return (dispatch) => {
    Axios.put(
      `http://localhost:4444/subcategories/update/${values._id}`,
      values
    ).then((res) => {
      const response = res.data;
      dispatch(getAdminAllSubCategory());
    });
  };
};

export const updateProduct = (id, values) => {
  return (dispatch) => {
    Axios.put(
      `http://localhost:4444/products/updateproduct/${id}`,
      values
    ).then((res) => {
      const response = res.data;
      dispatch(getAdminAllProduct());
    });
  };
};
