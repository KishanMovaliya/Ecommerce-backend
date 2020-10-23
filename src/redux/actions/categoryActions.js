import Axios from "axios";
import { GET_CATEGORY } from "./types";

export const getCategory = (id) => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/categories/select/${id}`).then((res) => {
      const response = res.data;
      dispatch({
        type: GET_CATEGORY,
        payload: response,
      });
    });
  };
};
