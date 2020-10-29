import Axios from "axios";
import { ADMIN_USER_ORDER } from "./types";

export const getUserOrder = (jwt) => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/confirmedorders/userorder`, {
      headers: {
        authorization: jwt,
      },
    }).then((res) => {
      const response = res.data;
      dispatch({
        type: ADMIN_USER_ORDER,
        payload: response,
      });
    });
  };
};
