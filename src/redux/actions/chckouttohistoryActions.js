import Axios from "axios";
import url from "../../config/config";
import { CHECKOUT_TO_HISTORY } from "./types";

export const movedToHistory = (jwt) => {
  return (dispatch) => {
    Axios.post(
      `${url}orderhistories/movetohistory`,
      {},
      {
        headers: {
          authorization: jwt,
        },
      }
    ).then((res) => {
      const response = res.data;
      dispatch({
        type: CHECKOUT_TO_HISTORY,
        payload: response,
      });
    });
  };
};
