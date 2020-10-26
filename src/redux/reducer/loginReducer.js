import { getJwt } from "../../helper/jwt";
import {
  LOGIN_SUCCESS,
  LOGGED_IN,
  LOGIN_ERROR,
  LOGGED_OUT,
} from "../actions/types";

const jwt = getJwt();

const initialState = {
  data: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case LOGGED_IN:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case LOGGED_OUT:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
