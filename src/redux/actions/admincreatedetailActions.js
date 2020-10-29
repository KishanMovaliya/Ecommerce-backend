import Axios from "axios";
import {
  getAdminAllCategory,
  getAdminAllProduct,
  getAdminAllSubCategory,
} from "./admingetdetailsActions";

export const createCategory = (values) => {
  return (dispatch) => {
    Axios.post("http://localhost:4444/categories/create", values).then(
      (res) => {
        const response = res.data;
        dispatch(getAdminAllCategory());
      }
    );
  };
};

export const createSubCategory = (id, values) => {
  return (dispatch) => {
    Axios.post(`http://localhost:4444/subcategories/create/${id}`, values).then(
      (res) => {
        const response = res.data;
        dispatch(getAdminAllSubCategory());
      }
    );
  };
};

export const createProduct = (categoryId, subcategoryId, values) => {
  return (dispatch) => {
    Axios.post(
      `http://localhost:4444/products/create/${categoryId}/${subcategoryId}`,
      values
    ).then((res) => {
      const response = res.data;
      dispatch(getAdminAllProduct());
    });
  };
};
