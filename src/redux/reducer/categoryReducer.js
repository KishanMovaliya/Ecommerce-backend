import { GET_ALL_CATEGORY, GET_CATEGORY } from "../actions/types";

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case GET_ALL_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
