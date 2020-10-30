import Axios from "axios";
import url from "../../config/config";
import {
  getAdminAllCategory,
  getAdminAllProduct,
  getAdminAllSubCategory,
} from "./admingetdetailsActions";

export const deleteCategory = (id) => {
  return (dispatch) => {
    Axios.delete(`${url}categories/delete/${id}`).then((res) => {
      dispatch(getAdminAllCategory());
    });
  };
};

export const deleteSubCategory = (id) => {
  return (dispatch) => {
    Axios.delete(`${url}subcategories/delete/${id}`).then((res) => {
      dispatch(getAdminAllSubCategory());
    });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    Axios.delete(`${url}products/deleteproduct/${id}`).then((res) => {
      dispatch(getAdminAllProduct());
    });
  };
};
