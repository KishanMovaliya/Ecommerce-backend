import {
  ADMIN_DELETE_CATEGORY,
  ADMIN_DELETE_PRODUCT,
  ADMIN_DELETE_SUB_CATEGORY,
} from "../actions/types";

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_DELETE_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case ADMIN_DELETE_SUB_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case ADMIN_DELETE_PRODUCT:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
