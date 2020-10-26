import { getJwt } from "../../helper/jwt";
import { REGISTER_SUCCESS } from "../actions/types";

const jwt = getJwt();

const initialState = {
  data: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
