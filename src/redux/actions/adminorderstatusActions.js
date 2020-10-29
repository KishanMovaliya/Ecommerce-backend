import Axios from "axios";
import { getUserOrder } from "./adminuserorderActions";
import { ADMIN_ORDER_STATUS } from "./types";

export const updateOrderStatus = (values, jwt) => {
  return (dispatch) => {
    Axios.post(`http://localhost:4444/confirmedorders/settrack`, values, {
      headers: {
        authorization: jwt,
      },
    }).then((res) => {
      const response = res.data;
      dispatch(getUserOrder(jwt));
    });
  };
};
