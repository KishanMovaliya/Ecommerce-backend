import { ADD_TO_CART } from "../actions/types";

const initialState = {
  data: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
