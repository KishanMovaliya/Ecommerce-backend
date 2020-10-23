import { GET_PRODUCTS, PRODUCT_DETAILS } from "../actions/types";

const initialState = {
  data: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case PRODUCT_DETAILS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
