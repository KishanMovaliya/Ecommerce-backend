import Axios from "axios";
import { ADMIN_SINGLE_CATEGORY } from "./types";

export const getSingleCategory = (id) => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/categories/select/${id}`).then((res) => {
      const response = res.data;
      //   console.log("response", response);
      dispatch({
        type: ADMIN_SINGLE_CATEGORY,
        payload: response,
      });
    });
  };
};
