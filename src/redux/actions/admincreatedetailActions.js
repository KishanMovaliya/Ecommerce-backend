import Axios from "axios";
import url from "../../config/config";
import {
  getAdminAllCategory,
  getAdminAllProduct,
  getAdminAllSubCategory,
} from "./admingetdetailsActions";

export const createCategory = (values) => {
  return (dispatch) => {
    Axios.post(`${url}categories/create`, values).then((res) => {
      dispatch(getAdminAllCategory());
    });
  };
};

export const createSubCategory = (id, values) => {
  return (dispatch) => {
    Axios.post(`${url}subcategories/create/${id}`, values).then((res) => {
      dispatch(getAdminAllSubCategory());
    });
  };
};

export const createProduct = (categoryId, subcategoryId, values) => {
  return (dispatch) => {
    Axios.post(
      `${url}products/create/${categoryId}/${subcategoryId}`,
      values
    ).then((res) => {
      dispatch(getAdminAllProduct());
    });
  };
};
