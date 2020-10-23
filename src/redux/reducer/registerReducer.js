import { getJwt } from "../../helper/jwt";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGGED_IN,
  LOGIN_ERROR,
} from "../actions/types";

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
