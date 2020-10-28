import Axios from "axios";
import { getAdminAllCategory } from "./admingetdetailsActions";
import { ADMIN_CREATE_CATEGORY } from "./types";

export const createCategory = (values) => {
  return (dispatch) => {
    Axios.post("http://localhost:4444/categories/create", values).then(
      (res) => {
        const response = res.data;
        //   console.log("response", response);
        dispatch(getAdminAllCategory());
      }
    );
  };
};
