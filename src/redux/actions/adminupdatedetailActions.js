import Axios from "axios";
import url from "../../config/config";
import {
  getAdminAllCategory,
  getAdminAllProduct,
  getAdminAllSubCategory,
} from "./admingetdetailsActions";

export const updateCategory = (values) => {
  return (dispatch) => {
    Axios.put(`${url}categories/update/${values._id}`, values).then((res) => {
      const response = res.data;
      dispatch(getAdminAllCategory());
    });
  };
};

export const updateSubCategory = (values) => {
  return (dispatch) => {
    Axios.put(`${url}subcategories/update/${values._id}`, values).then(
      (res) => {
        const response = res.data;
        dispatch(getAdminAllSubCategory());
      }
    );
  };
};

export const updateProduct = (id, values) => {
  return (dispatch) => {
    Axios.put(`${url}products/updateproduct/${id}`, values).then((res) => {
      const response = res.data;
      dispatch(getAdminAllProduct());
    });
  };
};
