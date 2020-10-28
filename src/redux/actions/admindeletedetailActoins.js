import Axios from "axios";
import { getAdminAllCategory } from "./admingetdetailsActions";
import { ADMIN_DELETE_CATEGORY } from "./types";

export const deleteCategory = (id) => {
  return (dispatch) => {
    Axios.delete(`http://localhost:4444/categories/delete/${id}`).then(
      (res) => {
        dispatch(getAdminAllCategory());
      }
    );
  };
};
