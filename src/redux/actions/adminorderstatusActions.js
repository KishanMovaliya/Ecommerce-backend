import Axios from "axios";
import url from "../../config/config";
import { getUserOrder } from "./adminuserorderActions";

export const updateOrderStatus = (values, jwt) => {
  return (dispatch) => {
    Axios.post(`${url}confirmedorders/settrack`, values, {
      headers: {
        authorization: jwt,
      },
    }).then((res) => {
      dispatch(getUserOrder(jwt));
    });
  };
};
