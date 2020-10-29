import {
  ADMIN_CREATE_CATEGORY,
  ADMIN_CREATE_PRODUCT,
  ADMIN_CREATE_SUB_CATEGORY,
} from "../actions/types";

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_CREATE_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ADMIN_CREATE_SUB_CATEGORY:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case ADMIN_CREATE_PRODUCT:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
