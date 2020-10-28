import Axios from "axios";
import { ADMIN_UPDATE_CATEGORY } from "./types";

export const updateCategory = (values) => {
  console.log("sadfcd", values);
  return (dispatch) => {
    Axios.put(
      `http://localhost:4444/categories/update/${values._id}`,
      values
    ).then((res) => {
      const response = res.data;
      dispatch({
        type: ADMIN_UPDATE_CATEGORY,
        payload: response,
      });
    });
  };
};
