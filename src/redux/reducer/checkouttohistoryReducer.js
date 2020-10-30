import { CHECKOUT_TO_HISTORY } from "../actions/types";

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHECKOUT_TO_HISTORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
