import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGGED_IN } from "../actions/types";

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
    default:
      return state;
  }
}
