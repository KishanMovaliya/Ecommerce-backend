import { GET_ALL_SUBCATEGORY, GET_SUBCATEGORY } from "../actions/types";

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUBCATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case GET_ALL_SUBCATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
