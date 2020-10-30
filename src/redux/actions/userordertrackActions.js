import Axios from "axios";
import { USER_ORDER_TRACK } from "./types";

export const userOrderTrack = (jwt) => {
  return (dispatch) => {
    Axios.get(`http://localhost:4444/confirmedorders/usertrack`, {
      headers: {
        authorization: jwt,
      },
    }).then((res) => {
      const response = res.data;
      dispatch({
        type: USER_ORDER_TRACK,
        payload: response,
      });
    });
  };
};
