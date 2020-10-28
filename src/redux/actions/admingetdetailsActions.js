import Axios from "axios";
import { ADMIN_ALL_CATEGORY, ADMIN_SINGLE_CATEGORY } from "./types";

export const getAdminAllCategory = () => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/categories/selectall`).then((res) => {
      const response = res.data;
      //   console.log("response", response);
      dispatch({
        type: ADMIN_ALL_CATEGORY,
        payload: response,
      });
    });
  };
};
