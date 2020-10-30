import { USER_ORDER_TRACK } from "../actions/types";

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_ORDER_TRACK:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
